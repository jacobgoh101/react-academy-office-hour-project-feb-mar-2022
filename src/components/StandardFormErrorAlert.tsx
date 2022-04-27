import { Alert, AlertIcon, Box } from '@chakra-ui/react';

export function StandardFormErrorAlert({
  errorMessage,
}: {
  errorMessage?: string;
}) {
  return (
    <Box pb={6}>
      <Alert status="error" rounded="md">
        <AlertIcon />
        {errorMessage ||
          `One or more fields are filled out incorrectly. Please check your entries
        and try again.`}
      </Alert>
    </Box>
  );
}
