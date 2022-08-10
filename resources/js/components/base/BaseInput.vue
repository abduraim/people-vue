<template>
    <div class="base-input">
        <label class="base-input__label" :for="id" v-if="label">{{ label }}</label>
        <input class="base-input__input"
               :type="type"
               :id="id"
               :min="min"
               :max="max"
               :value="modelValue"
               @input="$emit('update:modelValue', $event.target.value)"
        >
    </div>
</template>

<script>
import {uniqueId} from "lodash";

export default {
    name: "BaseInput",
    emits: ['update:modelValue'],
    props: {
        modelValue: {
            type: [String, Number],
            default: '',
        },
        label: String,
        id: {
            type: String,
            default: function () {
                return 'base-input_' + uniqueId();
            }
        },
        type: {
            type: String,
            default: 'text',
            validator: value => {
                return [
                    'text',
                    'number',
                ].indexOf(value) !== -1
            },
        },
        min: Number,
        max: Number,
    },
}
</script>

<style lang="scss" scoped>
.base-input {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 2rem;

    &:last-child {
        margin-bottom: 0;
    }

    &__label {
        margin-bottom: .3rem;
        max-width: 20rem;
    }

    &__input {
        display: flex;
        height: 2rem;
        min-width: 15rem;
        padding: .2rem .5rem;
        font-size: 1rem;
    }
}
</style>