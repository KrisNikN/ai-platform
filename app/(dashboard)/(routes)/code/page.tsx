"use client";

import * as z from "zod";
import axios from "axios";
import Heading from "@/components/heading";
import { Code } from "lucide-react";
import { useForm } from "react-hook-form";
import { formShema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChatCompletionRequestMessage } from "openai";
import { Empty } from "@/components/Empty";
import { Loader } from "@/components/Loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import ReactMarkdown from "react-markdown";

const CodePage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

  const form = useForm<z.infer<typeof formShema>>({
    defaultValues: {
      prompt: ""
    },
    resolver: zodResolver(formShema)
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formShema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt
      };
      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/code", {
        messages: newMessages
      });

      setMessages(current => [...current, userMessage, response.data]);

      form.reset();
    } catch (error: any) {
      //TODO: Open PRO MODEL
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title='Code Generation'
        description='Generate code using descriptive text.'
        icon={Code}
        iconColor='text-green-700'
        bgColor='bg-green-700/10'
      />
      <div className='px-4 lg:px-8'>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='grid w-full grid-cols-12 gap-2 rounded-lg border p-4 px-3 focus-within:shadow-sm md:px-6'
            >
              <FormField
                name='prompt'
                render={({ field }) => (
                  <FormItem className='col-span-12 lg:col-span-10'>
                    <FormControl className='m-0 p-0'>
                      <Input
                        className='border-0  outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                        disabled={isLoading}
                        placeholder='Simple toggle button using react hooks'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className='col-span-12 w-full lg:col-span-2' disabled={isLoading}>
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className='mt-4 space-y-4'>
          {isLoading && (
            <div className='flex w-full items-center justify-center rounded-lg bg-muted p-8'>
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && <Empty label='No conversation started' />}
          <div className='flex flex-col-reverse gap-y-4'>
            {messages.map((message, index) => {
              console.log(message);
              return (
                <div
                  key={index}
                  className={cn(
                    "flex w-full items-start gap-x-8 rounded-lg p-8",
                    message.role === "user" ? "border border-black/10 bg-white" : "bg-muted"
                  )}
                >
                  {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                  <ReactMarkdown
                    components={{
                      pre: ({ node, ...props }) => (
                        <div className='my-2 w-full overflow-auto rounded-lg bg-black/10 p-2'>
                          <pre {...props} />
                        </div>
                      ),
                      code: ({ node, ...props }) => <code className='rounded-lg bg-black/10 p-1' {...props} />
                    }}
                    className='overflow-hidden text-sm leading-7'
                  >
                    {message.content || ""}
                  </ReactMarkdown>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePage;
