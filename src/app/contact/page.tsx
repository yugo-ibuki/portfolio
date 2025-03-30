'use client'

import type { FC } from 'react'
import { Block, Title } from '@components'
import { useForm } from 'react-hook-form'
import type { IFormInputs } from '@lib/sendMail'
import { sendMail } from '@lib/sendMail'
import { hasErrors } from '@lib/hasErrors'
import { useToast } from '@/components/hooks/use-toast'
import { Button } from '@/components/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/components/ui/form'
import { Input } from '@/components/components/ui/input'
import { Textarea } from '@/components/components/ui/textarea'
import { toast } from '@/components/hooks/use-toast'

const Contact: FC = () => {
  const form = useForm<IFormInputs>()

  const onSubmit = async (data: IFormInputs): Promise<void> => {
    if (hasErrors(form.formState.errors)) return
    try {
      await sendMail(data)
      toast({
        title: 'Success',
        description: 'Mail sent successfully!',
        variant: 'default',
      })
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to send mail. Please try again.',
        variant: 'destructive',
      })
    }
  }

  return (
    <main className="container mx-auto px-4">
      <Block>
        <Title>Contact</Title>
        <div className="mt-8">
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
                    <FormLabel>
                      Name <span className="text-red-500">*</span>
                    </FormLabel>
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
                    <FormLabel>
                      Email <span className="text-red-500">*</span>
                    </FormLabel>
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
                    <FormLabel>Belonging (Company, Organization, Freelance...etc)</FormLabel>
                    <FormControl>
                      <Input placeholder="Your organization" {...field} />
                    </FormControl>
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
                    <FormLabel>
                      Content <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your message"
                        className="min-h-[300px]"
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
                  variant="outline"
                  size="lg"
                  disabled={form.formState.isSubmitting}
                  className="min-w-[160px]"
                >
                  {form.formState.isSubmitting ? 'Sending...' : 'Submit'}
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
