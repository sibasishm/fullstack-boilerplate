import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	Button,
} from '@chakra-ui/core';

import { Container } from 'src/components/Container';

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
	const { handleSubmit, errors, register } = useForm();
	const [isSubmitting, setIsSubmitting] = useState(false);

	function validateName(value) {
		let error;
		if (!value) {
			error = 'Name is required';
		} else if (value.length <= 4) {
			error = 'Username must be more than 4 characters.';
		}
		return error || true;
	}

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
				<FormControl isInvalid={errors.name} mt={24}>
					<FormLabel htmlFor='name'>First name</FormLabel>
					<Input
						name='name'
						placeholder='name'
						ref={register({ validate: validateName })}
					/>
					<FormErrorMessage>
						{errors.name && errors.name.message}
					</FormErrorMessage>
				</FormControl>
				<Button
					mt={4}
					colorScheme='teal'
					isLoading={isSubmitting}
					loadingText='Submitting'
					type='submit'
				>
					Submit
				</Button>
			</form>
		</Container>
	);
};

export default Register;
