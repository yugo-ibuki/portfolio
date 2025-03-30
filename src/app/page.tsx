import { Block, Title, Skill, Graduate } from '@components'
import type { NextPage } from 'next'
import { AiFillGithub } from 'react-icons/ai'
import Link from 'next/link'
import { Certificate } from '@components/List/Certificate'
import { GitContribution } from '@components/GitContribution'
import { Card, CardContent } from '@/components/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/components/ui/avatar'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/components/ui/hover-card'

type TProfiles = {
  name: string
  description: string
}

const profiles: TProfiles[] = [
  { name: 'Name', description: 'YUGO IBUKI' },
  // { name: 'Age', description: '30' },
  { name: 'Language', description: 'JP / EN' },
  { name: 'Job Title', description: 'Frontend Developer / Backend Developer' },
]

const Page: NextPage = () => {
  return (
    <main className="space-y-8">
      <Card className="mt-8">
        <CardContent className="p-6">
          <div className="flex items-center gap-8 flex-col md:flex-row">
            <Avatar className="w-64 h-64">
              <AvatarImage src="/assets/me.jpeg" alt="Yugo Ibuki" />
              <AvatarFallback>YI</AvatarFallback>
            </Avatar>
            <div className="space-y-4 flex-1">
              <div className="space-y-2">
                {profiles.map((profile) => (
                  <div key={profile.name} className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                    <span className="font-semibold text-muted-foreground min-w-24">
                      {profile.name}:
                    </span>
                    <span className="flex-1">{profile.description}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 pt-2">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Link
                      href="https://github.com/yugo-ibuki"
                      className="transition-colors hover:text-primary"
                      target="_blank"
                    >
                      <AiFillGithub className="w-6 h-6" />
                    </Link>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-auto">
                    <div className="flex flex-col gap-2">
                      <p className="text-sm">Visit my GitHub profile</p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
                {/*<Link*/}
                {/*  href="https://www.linkedin.com/in/yugo-ibuki-7353b7138/"*/}
                {/*  className={'inline-block mt-2 sp:mt-3'}*/}
                {/*  target={'_blank'}*/}
                {/*>*/}
                {/*  <AiFillLinkedin size={25} />*/}
                {/*</Link>*/}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Block>
        <Title>COMMENT</Title>
        <Card className="mt-6">
          <CardContent className="p-6 prose dark:prose-invert">
            <p>
              Hello, this is Yugo.
              <br />
              I'm a web developer, living in Japan, who desires to work overseas.
              <br />
              My skills are below here, please take a little look at it.
            </p>
          </CardContent>
        </Card>
      </Block>

      <Block>
        <GitContribution />
      </Block>

      <Block>
        <Title>SKILLS</Title>
        <div className="mt-6">
          <Skill />
        </div>
      </Block>

      <Block>
        <Title>GRADUATE</Title>
        <div className="mt-6">
          <Graduate />
        </div>
      </Block>

      <Block>
        <Title>CERTIFICATE</Title>
        <div className="mt-6">
          <Certificate />
        </div>
      </Block>
    </main>
  )
}

export default Page
