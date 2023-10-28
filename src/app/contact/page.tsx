'use client'

import type { FC } from 'react'
import { Block, Title } from '@components'
import { useForm } from 'react-hook-form'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from '@chakra-ui/react'
import type { IFormInputs } from '@lib/sendMail'
import { sendMail } from '@lib/sendMail'
import { hasErrors } from '@lib/hasErrors'

const Contact: FC = () => {
  const toast = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormInputs>()

  const onSubmit = async (data: IFormInputs): Promise<void> => {
    if (hasErrors(errors)) return
    try {
      await sendMail(data)
      toast({
        title: 'Mail sent successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'bottom-left',
      })
    } catch (err) {
      toast({
        title: 'Mail sent failed',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-left',
      })
    }
  }

  return (
    <main>
      <Block>
        <Title>Contact</Title>
        <div className={'mt-5 flex flex-col'}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={'flex flex-col gap-y-4'}
          >
            <FormControl isInvalid={Boolean(errors.name)}>
              <FormLabel htmlFor="name">
                <span className={'text-red-500'}>*</span>
                Name:
              </FormLabel>
              <Input
                id="name"
                size="sm"
                {...register('name', {
                  required: '"name" is required',
                  maxLength: {
                    value: 50,
                    message: 'name must be less than 50 characters.',
                  },
                  minLength: {
                    value: 2,
                    message: 'name must be greater than 2 chracters.',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.email)}>
              <FormLabel htmlFor="email">
                <span className={'text-red-500'}>*</span>
                E-mail:
              </FormLabel>
              <Input
                id="email"
                type="email"
                {...register('email', {
                  required: '"email" is required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'email must be formatted as Email.',
                  },
                  maxLength: {
                    value: 50,
                    message: 'email must be less than 50 characters.',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.belonging)}>
              <FormLabel htmlFor="belonging">
                Belonging(Company, Organization, Freelance...etc):
              </FormLabel>
              <Input
                id="belonging"
                type="text"
                {...register('belonging', {
                  maxLength: {
                    value: 50,
                    message: 'belonging must be less than 50 characters.',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.belonging && errors.belonging.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.content)}>
              <FormLabel htmlFor="content">
                <span className={'text-red-500'}>*</span>
                Content:
              </FormLabel>
              <Textarea
                id="content"
                h={300}
                {...register('content', {
                  required: '"content" is required',
                })}
              />
              <FormErrorMessage>
                {errors.content && errors.content.message}
              </FormErrorMessage>
            </FormControl>

            <div className={'flex justify-center mt-5'}>
              <Button
                w={40}
                colorScheme="gray"
                isLoading={isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </Block>
    </main>
  )
}

export default Contact
