import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Flex,
  Box,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../slices/todoSlice";

export default function AddTodo() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const dispatch = useDispatch();
  const route = useRouter();

  const testSubmit = (data) => {
    dispatch(addTodo(data));
    route.push('/todo');
  };

  const isError = errors.title?.type === "required";
  return (
    <Flex width="full" align="center" justifyContent="center" mt={4}>
      <Box width="500px">
        <form onSubmit={handleSubmit(testSubmit)}>
          <FormControl isInvalid={isError}>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input type="text" {...register("title", { required: true })} placeholder="input your title" />
            {errors.title?.type === "required" && (
              <FormErrorMessage>Title is required</FormErrorMessage>
            )}
          </FormControl>
          <Button type="submit" colorScheme="blue" mt={2}>
            Submit
          </Button>
        </form>
      </Box>
    </Flex>
  );
}
