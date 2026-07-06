import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { AppError } from '#/errors'
import { authClient } from '#/lib/auth-client.ts'

export function useEmailSignUp() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (
      variables: Parameters<typeof authClient.signUp.email>[0],
    ) => {
      const { data, error } = await authClient.signUp.email(variables)
      if (error) {
        console.error('email signup failed', error)
        throw new AppError(
          error.message ??
            error.statusText ??
            'Something went wrong during signup',
          {
            isOperational: true,
          },
        )
      }

      return data
    },
    onSuccess: () => navigate({ to: '/dashboard' }),
  })
}

export function useEmailSignIn() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (
      variables: Parameters<typeof authClient.signIn.email>[0],
    ) => {
      const { data, error } = await authClient.signIn.email(variables)

      if (error) {
        console.error('email sign in failed', error)
        throw new AppError(
          error.message ??
            error.statusText ??
            'Something went wrong during email sign in',
        )
      }

      return data
    },
    onSuccess: () => navigate({ to: '/dashboard' }),
  })
}

export function useSocialSignIn() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (
      variables: Parameters<typeof authClient.signIn.social>[0],
    ) => {
      const { data, error } = await authClient.signIn.social(variables)

      if (error) {
        console.error('social login failed', error)
        throw new AppError(
          error.message ??
            error.statusText ??
            'Something went wrong during social login',
        )
      }

      return data
    },
    onSuccess: () => navigate({ to: '/dashboard' }),
  })
}

export function useSignOut() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async () => {
      const { data, error } = await authClient.signOut()

      if (error) {
        console.error('logout failed', error)
        throw new AppError(
          error.message ??
            error.statusText ??
            'Something went wrong during sign out',
        )
      }

      return data
    },
    onSuccess: () => navigate({ to: '/' }),
  })
}
