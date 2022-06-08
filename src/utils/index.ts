import {objectUnknowKeys} from "../types"

export const isEmptyObject = (obj: objectUnknowKeys): boolean => Object.keys(obj).length === 0
