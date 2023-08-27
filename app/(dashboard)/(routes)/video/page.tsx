"use client";

import * as z from "zod";
import axios from "axios";
import Heading from "@/components/heading";
import { VideoIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { formShema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Empty } from "@/components/Empty";
import { Loader } from "@/components/Loader";
import { useProModal } from "@/hooks/use-pro-modal";
import { toast } from "react-hot-toast";

const VideoPage = () => {
  const router = useRouter();
  const [video, setVideo] = useState<string>();
  const proModal = useProModal();

  const form = useForm<z.infer<typeof formShema>>({
    defaultValues: {
      prompt: ""
    },
    resolver: zodResolver(formShema)
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formShema>) => {
    try {
      setVideo(undefined);

      const response = await axios.post("/api/video", {
        prompt: values.prompt
      });

      // console.log(response);
      setVideo(response.data[0]);
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title='Video Generation'
        description='Turn your prompt into video.'
        icon={VideoIcon}
        iconColor='text-orange-700'
        bgColor='bg-orange-700/10'
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
                        placeholder='Clown fish swimming around a coral reef.'
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
          {!video && !isLoading && <Empty label='No video generated' />}
          {video && (
            <video controls className='mt-8 aspect-video w-full rounded-lg border bg-black'>
              <source src={video} />
            </video>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
