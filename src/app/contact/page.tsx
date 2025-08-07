'use client'

import type { FC } from 'react'
import { Block, Title } from '@components'
import { useForm } from 'react-hook-form'
import type { IFormInputs } from '@lib/sendMail'
import { sendMail } from '@lib/sendMail'
import { Button } from '@/components/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/components/ui/form'
import { Input } from '@/components/components/ui/input'
import { Textarea } from '@/components/components/ui/textarea'
import { toast } from '@/components/hooks/use-toast'

const Contact: FC = () => {
  const form = useForm<IFormInputs>({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      belonging: '',
      content: ''
    }
  })

  const onSubmit = async (data: IFormInputs): Promise<void> => {
    try {
      await sendMail(data)
      toast({
        title: 'Success',
        description: 'Mail sent successfully!',
        variant: 'default',
      })
      form.reset()
    } catch (error) {
      // In production, you might want to use a proper logging service
      toast({
        title: 'Error',
        description: 'Failed to send mail. Please try again.',
        variant: 'destructive',
      })
    }
  }

  return (
    <main className="w-full">
      <Block className="w-full max-w-none px-0">
        <div className="px-6">
          <Title>GET IN TOUCH</Title>
        </div>
        <div className="mt-6 px-6">      
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                rules={{
                  required: '"name" is required',
                  maxLength: {
                    value: 50,
                    message: 'name must be less than 50 characters.',
                  },
                  minLength: {
                    value: 2,
                    message: 'name must be greater than 2 characters.',
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                rules={{
                  required: '"email" is required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'email must be formatted as Email.',
                  },
                  maxLength: {
                    value: 50,
                    message: 'email must be less than 50 characters.',
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="belonging"
                rules={{
                  maxLength: {
                    value: 50,
                    message: 'belonging must be less than 50 characters.',
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization</FormLabel>
                    <FormControl>
                      <Input placeholder="Company, Organization, etc." {...field} />
                    </FormControl>
                    <FormDescription>
                      Optional: Let me know where you're from
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                rules={{
                  required: '"content" is required',
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your message"
                        className="min-h-[200px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-center">
                <Button
                  type="submit"
                  size="lg"
                  disabled={form.formState.isSubmitting}
                  className="min-w-[160px]"
                >
                  {form.formState.isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </Block>
    </main>
  )
}

export default Contact
