import { UseMutationResult, useMutation, useQueryClient } from "react-query";
import { connectToFitbit } from "../../requests/userRequests";

interface ConnectToFitbit {
    userId: string;
    code: string,
    state: string
}

export const useConnectToFitbit = (): UseMutationResult<void, unknown, ConnectToFitbit>=> {

    const queryClient = useQueryClient();
    
    return useMutation({
      mutationFn: ({userId, code, state}: ConnectToFitbit) => connectToFitbit(userId, state, code),
      mutationKey: ["connectToFitbit"],
      onSuccess: () => {
        queryClient.invalidateQueries('getUserByEmail');
      },
    });
}