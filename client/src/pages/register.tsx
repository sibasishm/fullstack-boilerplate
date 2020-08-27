import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'urql';
import {
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	Button,
	Stack,
	Container,
} from '@chakra-ui/core';

interface RegisterProps {}

type FormData = {
	username: string;
	password: string;
};

const REGISTER_MUTATION = `
mutation Register($username: String!, $password: String!) {
	register(credentials: {username: $username, password: $password}) {
		errors {
			name
			message
		}
		user {
			id
			username
		}
	}
}
`;

const Register: React.FC<RegisterProps> = ({}) => {
	const { handleSubmit, errors, register } = useForm<FormData>();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [{}, signup] = useMutation(REGISTER_MUTATION);

	const onSubmit = values => {
		setIsSubmitting(true);
		signup(values);
		setIsSubmitting(false);
	};

	return (
		<Container>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack spacing={4}>
					<FormControl isInvalid={!!errors.username}>
						<FormLabel htmlFor='username'>Username</FormLabel>
						<Input
							name='username'
							placeholder='john_doe'
							ref={register({ required: true, minLength: 4 })}
						/>
						<FormErrorMessage>
							{errors.username &&
								'Username is required and must be more than 4 characters.'}
						</FormErrorMessage>
					</FormControl>
					<FormControl isInvalid={!!errors.password}>
						<FormLabel htmlFor='password'>Password</FormLabel>
						<Input
							name='password'
							placeholder='********'
							type='password'
							ref={register({ required: true, minLength: 6 })}
						/>
						<FormErrorMessage>
							{errors.password &&
								'Password is required and must be more than 6 characters.'}
						</FormErrorMessage>
					</FormControl>
					<Button
						colorScheme='teal'
						isLoading={isSubmitting}
						loadingText='Submitting'
						type='submit'
					>
						Submit
					</Button>
				</Stack>
			</form>
		</Container>
	);
};

export default Register;
