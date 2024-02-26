import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

export interface UseCountdownProps {
  targetDate: string
  onExpired?: () => void
}

interface Res {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export const useCountdown = ({ onExpired, targetDate }: UseCountdownProps): Res => {
  const countDownDate = new Date(dayjs(targetDate).toDate()).getTime()
  const [countDown, setCountDown] = useState(countDownDate - new Date().getTime())

  useEffect(() => {
    if (countDown <= 0) return

    const interval = setInterval(() => {
      const timer = countDownDate - new Date().getTime()
      setCountDown(timer)
      if (timer <= 0) {
        onExpired?.()
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [countDownDate])

  return getReturnValues(countDown)
}

function getReturnValues(countDown: number): Res {
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24))
  const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000)

  if (Number.isNaN(seconds)) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    }
  }

  return {
    days: days <= 0 ? 0 : days,
    hours: hours <= 0 ? 0 : hours,
    minutes: minutes <= 0 ? 0 : minutes,
    seconds: seconds <= 0 ? 0 : seconds,
  }
}
