import { useState } from 'react';
import { useForm } from 'react-hook-form';
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

const Register: React.FC<RegisterProps> = ({}) => {
	const { handleSubmit, errors, register } = useForm<FormData>();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const onSubmit = values => {
		setIsSubmitting(true);

		setTimeout(() => {
			alert(JSON.stringify(values, null, 2));
			setIsSubmitting(false);
		}, 1000);
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
							ref={register({ required: true, minLength: 8 })}
						/>
						<FormErrorMessage>
							{errors.password &&
								'Password is required and must be more than 8 characters.'}
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
