import type { FC } from 'react'
import { Block, Title } from '@components'
import { useForm } from 'react-hook-form'
import {
  Button,
  FormControl, FormErrorMessage,
  FormLabel, Textarea,
} from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import type { IFormInputs } from '@lib/sendMail'
import { sendMail } from '@lib/sendMail'

const Contact: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<IFormInputs>()

  const onSubmit = async (data: IFormInputs): Promise<void> => {
    // エラーがあるかどうかチェック
    const hasError = Object.values(errors).map((value) => value).length != 0
    if (hasError) return
    await sendMail(data)
  }
  return (
    <main>
      <Block>
        <Title>Contact</Title>
        <div className={'mt-5 flex flex-col'}>
          <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col gap-y-4'}>
            <FormControl isInvalid={Boolean(errors.name)}>
              <FormLabel htmlFor='name'>
                <span className={'text-red-500'}>*</span>
                Name(名前):
              </FormLabel>
              <Input
                id='name'
                {...register('name', {
                  required: '名前は必須項目です。',
                  maxLength: { value: 50, message: '名前は50文字以内にしてください。' },
                  minLength: { value: 2, message: '名前は2文字以上にしてください。' },
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.email)}>
              <FormLabel htmlFor='email'>
                <span className={'text-red-500'}>*</span>
                E-mail(メールアドレス):
              </FormLabel>
              <Input
                id='email'
                type='email'
                {...register('email', {
                  required: 'メールアドレスは必須項目です。',
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
              <FormLabel htmlFor='belonging'>
                Belongings(所属):
              </FormLabel>
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
              <FormLabel htmlFor='content'>
                <span className={'text-red-500'}>*</span>
                Content(内容):
              </FormLabel>
              <Textarea
                id='content'
                h={300}
                {...register('content', {
                  required: '内容は必須項目です。',
                })}
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