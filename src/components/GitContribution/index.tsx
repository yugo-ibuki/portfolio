'use client'
import type { Contribution } from '@hooks/useGitContribution'
import { useGitContribution } from '@hooks/useGitContribution'
import { Box, Flex, Tooltip, Spinner, Text } from '@chakra-ui/react'
import { useCalendar } from '@hooks/useCalendar'
import type { FC } from 'react'
import { getColor } from '@lib/getColor'

export const GitContribution = () => {
  const { loading, error, contributions } = useGitContribution()
  const { totalWeeks, calendarData } = useCalendar({ contributions })

  if (error) {
    return <Text color="red.300">エラーになりました。</Text>
  }

  if (loading) {
    return (
      <Flex direction="column" align="center" justify="center">
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      </Flex>
    )
  }

  return (
    <Box className="overflow-x-auto">
      <Flex justifyContent="space-around">
        {Array.from({ length: totalWeeks }, (_, weekIndex) => (
          <Flex key={weekIndex} flexDirection="column">
            {Array.from({ length: 7 }, (_, dayIndex) => {
              const contribution = calendarData[`${weekIndex}-${dayIndex}`]
              return contribution ? (
                <Contribution key={weekIndex + dayIndex} contribution={contribution} />
              ) : (
                <Box width="14px" height="14px" m="1px" bg="#d3d3d3" borderRadius="sm" />
              )
            })}
          </Flex>
        ))}
      </Flex>
    </Box>
  )
}

const Contribution: FC<{ contribution: Contribution }> = ({ contribution }) => {
  return (
    <Tooltip label={`${contribution.count} contributions on ${contribution.date}`}>
      <Box width="14px" height="14px" m="1px" bg={getColor(contribution.count)} borderRadius="sm" />
    </Tooltip>
  )
}
