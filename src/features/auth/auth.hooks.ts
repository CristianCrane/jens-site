import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { AppError } from '#/errors'
import { authClient } from '#/lib/auth-client.ts'

export function useSocialSignIn() {
  return useMutation({
    mutationFn: async (
      provider: Parameters<typeof authClient.signIn.social>[0]['provider'],
    ) => {
      const { data, error } = await authClient.signIn.social({
        provider,
        callbackURL: '/app',
      })

      if (error) {
        throw new AppError(error.message ?? error.statusText, {
          code: 'AUTHENTICATION_ERROR',
          cause: error,
        })
      }

      return data
    },
  })
}

export function useEmailSignUp() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (
      userInfo: Parameters<typeof authClient.signUp.email>[0],
    ) => {
      const { data, error } = await authClient.signUp.email({
        ...userInfo,
      })

      if (error) {
        throw new AppError(error.message ?? error.statusText, {
          code: 'AUTHENTICATION_ERROR',
          cause: error,
          isOperational: true,
        })
      }

      return data
    },
    onSuccess: () => navigate({ to: '/app' }),
  })
}

export function useEmailSignIn() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (
      userInfo: Parameters<typeof authClient.signIn.email>[0],
    ) => {
      const { data, error } = await authClient.signIn.email({
        ...userInfo,
        callbackURL: '/app',
      })

      if (error) {
        throw new AppError(error.message ?? error.statusText, {
          code: 'AUTHENTICATION_ERROR',
          cause: error,
          isOperational: true,
        })
      }

      return data
    },
    onSuccess: () => navigate({ to: '/app' }),
  })
}

export function useSignOut() {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: async () => {
      await authClient.signOut()
      await navigate({ to: '/' })
    },
  })
}

export function useSendVerificationEmail() {
  return useMutation({
    mutationFn: (email: string) =>
      authClient.sendVerificationEmail({
        email,
        callbackURL: '/app',
      }),
  })
}

export function useRequestPasswordReset() {
  return useMutation({
    mutationFn: async (email: string) => {
      const { data, error } = await authClient.requestPasswordReset({
        email,
        redirectTo: '/auth/reset',
      })

      if (error) {
        throw new AppError(error.message ?? error.statusText, {
          code: 'AUTHENTICATION_ERROR',
          isOperational: true,
        })
      }

      return data
    },
  })
}

export function useResetPassword() {
  return useMutation({
    mutationFn: async ({
      newPassword,
      token,
    }: {
      newPassword: string
      token: string
    }) => {
      const { data, error } = await authClient.resetPassword({
        newPassword,
        token,
      })

      if (error) {
        throw new AppError(error.message ?? error.statusText, {
          code: 'AUTHENTICATION_ERROR',
          isOperational: true,
        })
      }

      return data
    },
  })
}
