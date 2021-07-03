import { RichTextFunctionSerializer } from "./types";

/**
 * Takes an array of serializers and returns a serializer applying
 * provided serializers sequentially until a result is returned
 *
 * @param serializers - Serializers to compose
 *
 * @returns Composed serializer
 *
 * @typeParam SerializerReturnType - Return type of serializers
 *
 * @remarks
 *
 * This is a low level helper mainly intended to be used by higher level packages
 * Most users aren't expected to this function directly
 */
export const composeSerializers = <SerializerReturnType>(
	...serializers: [
		RichTextFunctionSerializer<SerializerReturnType>,
		...RichTextFunctionSerializer<SerializerReturnType>[]
	]
): RichTextFunctionSerializer<SerializerReturnType> => {
	return (...args) => {
		for (let i = 0; i < serializers.length; i++) {
			const res = serializers[i](...args);

			if (res != null) {
				return res;
			}
		}
	};
};