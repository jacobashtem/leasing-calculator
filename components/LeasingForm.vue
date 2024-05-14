<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const props = defineProps({
  type: { type: String, default: () => [], required: true },
});

const emit = defineEmits(['calculationResults']);

const currentYear = new Date().getFullYear();
const formSchema = toTypedSchema(
  z.object({
    ageOfCar: z
      .number({
        required_error: "Pole jest obowiązkowe. ",
        invalid_type_error:
          "Pole jest obowiązkowe - wpisać do niego możesz jedynie liczby.",
      })
      .int({ message: "Wpisana wartość musi być liczbą całkowitą." })
      .gt(0, "Wpisana wartość nie może być mniejsza lub równa zero.")
      .lte(currentYear, `Rok produkcji nie może być nowszy niż ${currentYear}`)
      .gte(2019, "Samochodów starszych niż rocznik 2019 nie obsługujemy.")
      .safe({ message: "Wpisana liczba jest zbyt duża." }),
    carValue: z
      .number({
        required_error: "Pole jest obowiązkowe. ",
        invalid_type_error:
          "Pole jest obowiązkowe - wpisać do niego możesz jedynie liczby.",
      })
      .int({ message: "Wpisana wartość musi być liczbą całkowitą." })
      .gt(0, "Wpisana wartość nie może być mniejsza lub równa zero.")
      .safe({ message: "Wpisana liczba jest zbyt duża." }),
    drivePlus: z.boolean().optional(),
  })
);
const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    drivePlus: true,
  },
});
const { error, loading, result, calculateLeasingFee } = useLeasingCalculator();
const onSubmit = form.handleSubmit(async (values) => {
  let obj = { ...values, calculatorType: props.type };
  await calculateLeasingFee(obj);
  emit('calculationResults', result.value);
});
</script>

<template>
  <form @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="ageOfCar">
      <FormItem>
        <FormLabel>Rok produkcji samochodu</FormLabel>
        <FormControl>
          <Input type="number" placeholder="np. 2023" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="carValue">
      <FormItem>
        <FormLabel>Wartość samochodu w {{ type }}</FormLabel>
        <FormControl>
          <Input
            type="number"
            placeholder="np. 400000"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField
      v-slot="{ value, handleChange }"
      type="checkbox"
      name="drivePlus"
    >
      <FormItem
        class="mt-4 flex flex-row items-start gap-x-3 space-y-0 rounded-md p-4"
      >
        <FormControl>
          <Checkbox :checked="value" @update:checked="handleChange" />
        </FormControl>
        <div class="space-y-1 leading-none">
          <FormLabel>Pakiet Drive+ - nadajnik GPS</FormLabel>
          <FormDescription>
            Rezygnacja z 'Drive+' wiąże się z zwiększeniem składki na
            ubezpieczenie o 11%.
          </FormDescription>
          <FormMessage />
        </div>
      </FormItem>
    </FormField>
    <Button class="mt-4" type="submit"> Oblicz wartość składki </Button>
  </form>
</template>