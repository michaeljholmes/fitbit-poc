import { isFuture, parseISO } from "date-fns";

export const isDateInFuture = (time: string) => isFuture(parseISO(time));