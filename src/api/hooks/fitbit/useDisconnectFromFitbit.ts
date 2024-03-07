import { UseMutationResult, useMutation, useQueryClient } from "react-query";
import { disconnectToFitbit } from "../../requests/userRequests";

export const useDisconnectFromFitbit = (): UseMutationResult<void, unknown, string>=> {

    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (userId) => disconnectToFitbit(userId),
      mutationKey: ["disconnectToFitbit"],
      onSuccess: () => {
        queryClient.invalidateQueries('getUserByEmail');
      },
    });
}