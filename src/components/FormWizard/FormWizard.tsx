import { useState } from 'react'
import type { ReactNode } from 'react'
import { useMutation } from '@tanstack/react-query'
import {
  Alert,
  Button,
  Card,
  Divider,
  Group,
  Stack,
  Stepper,
  Title,
} from '@mantine/core'
import { schemaResolver, useForm } from '@mantine/form'
import type { UseFormReturnType } from '@mantine/form'
import { IconAlertCircle } from '@tabler/icons-react'
import type { ZodType } from 'zod'

type FormStep<TFormValues> = {
  title: string
  schema: ZodType
  renderStep: (form: UseFormReturnType<TFormValues>) => ReactNode
}

type FormWizardProps<TFormValues, TOnSubmitReturnType> = {
  steps: FormStep<TFormValues>[]
  validationSchema: ZodType<TFormValues>
  initialValues: TFormValues
  onSubmit: (values: TFormValues) => Promise<TOnSubmitReturnType>
  onSubmitLabel?: string
}

export default function FormWizard<
  TFormValues extends Record<string, unknown>,
  TOnSubmitReturnType,
>({
  steps,
  validationSchema,
  initialValues,
  onSubmit,
  onSubmitLabel,
}: FormWizardProps<TFormValues, TOnSubmitReturnType>) {
  const [currentStep, setCurrentStep] = useState(0)
  const finalStep = steps.length - 1

  const form = useForm<TFormValues>({
    mode: 'controlled',
    initialValues,
    validate: schemaResolver(
      currentStep === finalStep ? validationSchema : steps[currentStep].schema,
    ),
  })

  const { mutate, isPending, error } = useMutation({
    mutationFn: onSubmit,
  })

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prevState) => prevState - 1)
    }
  }

  return (
    <>
      {/* todo: fix stepper inactive styles, too grey. black maybe? */}
      <Stepper active={currentStep} mb="lg" size="xs">
        {steps.map((step) => (
          <Stepper.Step key={`step-${step.title}`} />
        ))}
      </Stepper>
      <Card p="3rem" mb="3rem">
        <Stack>
          <form
            onSubmit={form.onSubmit((values) =>
              currentStep === finalStep
                ? mutate(values)
                : setCurrentStep((prevState) => prevState + 1),
            )}
          >
            <Title ta="center" mb="xl" size="1.5rem">
              {steps[currentStep].title}
            </Title>
            {steps[currentStep].renderStep(form)}
            <Divider my="xl" />
            <Group justify="space-between">
              <Button
                disabled={currentStep === 0}
                variant="outline"
                onClick={handlePrevious}
              >
                Previous
              </Button>
              <Button type="submit" loading={isPending}>
                {currentStep === finalStep
                  ? (onSubmitLabel ?? 'Submit')
                  : 'Continue'}
              </Button>
            </Group>
          </form>
          {error && (
            <Alert
              variant="light"
              color="red"
              title="Oops. Something went wrong"
              icon={<IconAlertCircle />}
              mt="2rem"
            >
              {error.message}
            </Alert>
          )}
        </Stack>
      </Card>
    </>
  )
}
