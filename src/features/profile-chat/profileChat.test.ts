import { describe, expect, test } from 'bun:test'
import profileChatData from '@/content/profile-chat.json'
import { buildProfileChatReply } from './response'

describe('profile chat', () => {
  test('keeps a maintenance note for duplicated profile data', () => {
    expect(profileChatData._maintenanceNote).toContain('update this JSON together')
  })

  test('answers skill questions from the profile chat data', () => {
    const reply = buildProfileChatReply('What technical skills does Yugo have?')

    expect(reply).toContain('TypeScript')
    expect(reply).toContain('AI')
  })

  test('answers work questions with project information', () => {
    const reply = buildProfileChatReply('Tell me about your works')

    expect(reply).toContain('UnitMux')
    expect(reply).toContain('Cheeyo')
  })

  test('separates longer answers into paragraphs', () => {
    const reply = buildProfileChatReply('Tell me about your works')

    expect(reply).toContain('\n\n')
  })

  test('guides the visitor when the question is outside the profile data', () => {
    const reply = buildProfileChatReply('What is his favorite lunch?')

    expect(reply).toContain('profile data')
    expect(reply).toContain('skills')
  })
})
