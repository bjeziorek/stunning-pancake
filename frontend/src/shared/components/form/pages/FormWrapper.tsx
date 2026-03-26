import { Card, Checkbox, Text, Flex, Radio, Select, RadioGroup } from "@radix-ui/themes";
import type { FormField, FormFieldTypes } from "../types/field";
import { useState } from "react";

interface FormWrapperProps {
    formConfig: FormField[]
}



export function FormWrapper(props: FormWrapperProps) {
    const { formConfig: formConfig } = props;
    const [form, setForm] = useState(
        Object.fromEntries(formConfig.map(f => [f.fieldId, f.defaultValue]))
    );

    console.log(form);

    const update = (id: string, value: string) => {
        setForm(prev => ({ ...prev, [id]: value }));
    };
    return (
        <Card>
            {formConfig.map((item: FormField) => {
                switch (item.type as FormFieldTypes) {
                    case "checkbox": return (
                        <Text as="label" size="2">
                            <Flex gap="2">
                                <Checkbox checked={form[item.fieldId] === "true"}
                                    onCheckedChange={(checked) =>
                                        update(item.fieldId, checked ? "true" : "false")
                                    } />
                                Agree to Terms and Conditions
                            </Flex>
                        </Text>
                    )
                    case "date": return (
                        <Flex direction="column" gap="1">
                            <Text as="label" htmlFor={item.fieldId} size="2">
                                {item.label}
                            </Text>
                            <input
                                onChange={e => update(item.fieldId, e.target.value)}
                                id={item.fieldId}
                                type="date"
                                defaultValue={item.defaultValue}
                                style={{
                                    padding: "8px",
                                    borderRadius: "4px",
                                    border: "1px solid var(--gray-6)",
                                    background: "var(--color-panel-solid)",
                                    color: "var(--gray-12)",
                                }}
                            />
                        </Flex>
                    )
                    case "number": return (
                        <Flex direction="column" gap="1">
                            <Text as="label" htmlFor={item.fieldId} size="2">
                                {item.label}
                            </Text>

                            <input
                                onChange={e => update(item.fieldId, e.target.value)}
                                id={item.fieldId}
                                type="number"
                                defaultValue={item.defaultValue}
                                placeholder={item.placeholder}
                                style={{
                                    padding: "8px 10px",
                                    borderRadius: "6px",
                                    border: "1px solid var(--gray-6)",
                                    backgroundColor: "var(--color-panel-solid)",
                                    color: "var(--gray-12)",
                                    fontSize: "14px",
                                    lineHeight: "1",
                                }}
                            />
                        </Flex>
                    )
                    case "password": return (
                        <Flex direction="column" gap="1">
                            <Text as="label" htmlFor={item.fieldId} size="2">
                                {item.label}
                            </Text>

                            <input
                                onChange={e => update(item.fieldId, e.target.value)}
                                id={item.fieldId}
                                type="password"
                                defaultValue={item.defaultValue}
                                placeholder={item.placeholder}
                                style={{
                                    padding: "8px 10px",
                                    borderRadius: "6px",
                                    border: "1px solid var(--gray-6)",
                                    backgroundColor: "var(--color-panel-solid)",
                                    color: "var(--gray-12)",
                                    fontSize: "14px",
                                    lineHeight: "1",
                                }}
                            />
                        </Flex>
                    )
                    case "radio": return (
                        <Flex asChild gap="2">
                            <Text as="label" size="2">

                                <RadioGroup.Root defaultValue={item.defaultValue} name="example"
                                    value={form[item.fieldId]}
                                    onValueChange={val => update(item.fieldId, val)}
                                >
                                    {item.selectOptions?.map(option => (<RadioGroup.Item onChange={e => update(item.fieldId, e.target.value)} value={option.value}>{option.label}</RadioGroup.Item>))}
                                </RadioGroup.Root>
                            </Text>
                        </Flex>
                    )
                    case "select": return (
                        <Select.Root
                            defaultValue={item.defaultValue}
                            value={form[item.fieldId]}
                            onValueChange={val => update(item.fieldId, val)}
                        >
                            <Select.Trigger />
                            <Select.Content>
                                <Select.Group>
                                    {/* <Select.Label>{item.label}</Select.Label> */}
                                    {item.selectOptions?.map(radio => (<Select.Item value={radio.value}>{radio.label}</Select.Item>))}
                                </Select.Group>
                            </Select.Content>
                        </Select.Root>
                    )
                    case "text": return (
                        <Flex direction="column" gap="1">
                            <Text as="label" htmlFor={item.fieldId} size="2">
                                {item.label}
                            </Text>

                            <input
                                onChange={e => update(item.fieldId, e.target.value)}
                                id={item.fieldId}
                                type="text"
                                defaultValue={item.defaultValue}
                                placeholder={item.placeholder}
                                style={{
                                    padding: "8px 10px",
                                    borderRadius: "6px",
                                    border: "1px solid var(--gray-6)",
                                    backgroundColor: "var(--color-panel-solid)",
                                    color: "var(--gray-12)",
                                    fontSize: "14px",
                                    lineHeight: "1",
                                }}
                            />
                        </Flex>
                    )
                    case "textarea": return (
                        <Flex direction="column" gap="1">
                            <Text as="label" htmlFor={item.fieldId} size="2">
                                {item.label}
                            </Text>

                            <textarea
                                onChange={e => update(item.fieldId, e.target.value)}
                                id={item.fieldId}
                                defaultValue={item.defaultValue}
                                placeholder={item.placeholder}
                                rows={4}
                                style={{
                                    padding: "8px 10px",
                                    borderRadius: "6px",
                                    border: "1px solid var(--gray-6)",
                                    backgroundColor: "var(--color-panel-solid)",
                                    color: "var(--gray-12)",
                                    fontSize: "14px",
                                    lineHeight: "1.4",
                                    resize: "vertical",
                                    outline: "none",
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = "var(--accent-9)";
                                    e.target.style.boxShadow = "0 0 0 1px var(--accent-9)";
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = "var(--gray-6)";
                                    e.target.style.boxShadow = "none";
                                }}
                            />
                        </Flex>
                    )
                    // default:
                    //     {
                    //         const _exhaustive: never = item
                    //         return _exhaustive
                    //     }
                }

            })}
        </Card >
    )
}