import { View, Text, Platform, KeyboardAvoidingView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { PROMPT } from "@/constants/data";

const OPEN_AI_KEY = process.env.EXPO_PUBLIC_OPEN_AI_KEY;

const Talk = () => {
  const insets = useSafeAreaInsets();

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const onSend = useCallback((messages: any = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  const prepareMessagesForGpt = (messages: IMessage[]) => {
    const msgs = messages.map((m: IMessage) => ({
      role: m.user._id == 1 ? "user" : "assistant",
      content: m.text,
    }));
    const systemMessage = {
      role: "system",
      content: PROMPT,
    };
    return [systemMessage, ...msgs.reverse()];
  };

  const sendMessage = async () => {
    console.log(JSON.stringify(prepareMessagesForGpt(messages)));
    setIsTyping(true);
    // make call to ai agent
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPEN_AI_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: prepareMessagesForGpt(messages),
      }),
    });
    const data = await response.json();

    const aiMessage = {
      _id: Math.random().toString(),
      text: data.choices[0].message.content.trim(),
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "Earnest",
      },
    };

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [aiMessage])
    );
    setIsTyping(false);
  };

  useEffect(() => {
    // start the conversation
    if (messages.length == 0) {
      setTimeout(() => {
        sendMessage();
      }, 500);
    }
  }, [messages]);

  useEffect(() => {
    // send message
    if (messages.length > 0) {
      const lastMessage: any = messages[0];
      if (lastMessage?.user._id == 1) {
        sendMessage();
      }
    }
  }, [messages]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        isTyping={isTyping}
        alwaysShowSend
        // wrapInSafeArea={false}
        bottomOffset={insets.bottom}
      />
      {Platform.OS === "android" && <KeyboardAvoidingView behavior="padding" />}
    </SafeAreaView>
  );
};

export default Talk;
