import type { FC } from 'react'
import { Block, Title } from '@components'
import { useForm } from 'react-hook-form'
import {
  Button,
  FormControl, FormErrorMessage,
  FormLabel, Textarea,
} from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import type { IFormInputs } from '@libs/sendMail'
import { sendMail } from '@libs/sendMail'

const Contact: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<IFormInputs>()

  const onSubmit = async (data: IFormInputs): Promise<void> => {
    if (errors) return
    await sendMail(data)
  }
  return (
    <main>
      <Block>
        <Title>Contact</Title>
        <div className={'mt-5 flex flex-col'}>
          <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col gap-y-4'}>
            <FormControl isInvalid={Boolean(errors.name)}>
              <FormLabel htmlFor='name'>名前:</FormLabel>
              <Input
                id='name'
                {...register('name', {
                  maxLength: { value: 50, message: '名前は50文字以内にしてください。' },
                  minLength: { value: 2, message: '名前は2文字以上にしてください。' },
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.email)}>
              <FormLabel htmlFor='email'>メールアドレス:</FormLabel>
              <Input
                id='email'
                type='email'
                {...register('email', {
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'メールアドレスの形式で入力してください。'
                  },
                  maxLength: 50,
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.belonging)}>
              <FormLabel htmlFor='belonging'>所属:</FormLabel>
              <Input
                id='belonging'
                type='text'
                {...register('belonging', { maxLength: 50 })}
              />
              <FormErrorMessage>
                {errors.belonging && errors.belonging.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.content)}>
              <FormLabel htmlFor='content'>内容:</FormLabel>
              <Textarea
                id='content'
                h={300}
                {...register('content', { required: false, maxLength: 50 })}
              />
              <FormErrorMessage>
                {errors.content && errors.content.message}
              </FormErrorMessage>
            </FormControl>

            <div className={'flex justify-center mt-5'}>
              <Button
                w={40}
                colorScheme='gray'
                isLoading={isSubmitting}
                type='submit'
              >
                送信
              </Button>
            </div>
          </form>
        </div>
      </Block>
    </main>
  )
}

export default Contact