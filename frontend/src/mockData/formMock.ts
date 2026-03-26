import type { FormField } from "@/shared/components/form/types/field";

export const formMockData: FormField[] = [
    {
        fieldId: "text",
        label: "Label 1 - text",
        placeholder: "type here",
        type: "text",
        defaultValue: '',
        validation: null
    },
    {
        fieldId: "textarea",
        label: "Label 2 - textarea",
        placeholder: "type here",
        type: "textarea",
        defaultValue: '',
        validation: null
    },
    {
        fieldId: "number",
        label: "Label 3 - number",
        placeholder: "type here",
        type: "number",
        defaultValue: '',
        validation: null
    },
    {
        fieldId: "select",
        label: "Label 4 - select",
        placeholder: "type here",
        type: "select",
        defaultValue: 'op2',
        validation: null,
        selectOptions: [
            {
                label: 'option 1',
                value: 'op1'
            },
            {
                label: 'option 2',
                value: 'op2'
            }
        ]
    },
    {
        fieldId: "checkbox",
        label: "Label 5 - checkbox",
        placeholder: "type here",
        type: "checkbox",
        defaultValue: '',
        validation: null
    },
    {
        fieldId: "radio",
        label: "Label 6 - radio",
        placeholder: "type here",
        type: "radio",
        defaultValue: '',
        validation: null,
        selectOptions: [
            {
                label: 'radio 1',
                value: 'r1'
            },
            {
                label: 'radio 2',
                value: 'r2'
            }
        ]
    },
    {
        fieldId: "date",
        label: "Label 7 - date",
        placeholder: "type here",
        type: "date",
        defaultValue: '',
        validation: null
    },
    {
        fieldId: "password",
        label: "Label 8 - password",
        placeholder: "type here",
        type: "password",
        defaultValue: '',
        validation: null
    },
]