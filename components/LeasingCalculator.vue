<template>
  <section>
    <Tabs
      v-if="!leasingCalculated"
      default-value="netto"
      class="w-[260px] xxs:w-[280px] xs:w-[400px] mx-auto"
    >
      <TabsList class="grid w-full grid-cols-2">
        <TabsTrigger value="netto"> Przedsiębiorca </TabsTrigger>
        <TabsTrigger value="brutto"> Konsument </TabsTrigger>
      </TabsList>
      <TabsContent value="netto">
        <Card>
          <CardHeader>
            <CardTitle>Kalkulator dla wpisanej kwoty netto</CardTitle>
            <CardDescription>
              Obliczanie szacunkowej skladki rocznej ubezpieczenia OC/AC na
              podstawie wieku samochodu i wartosci auta
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-2">
            <LeasingForm
              @calculationResults="handleLeasingFormEvent"
              :type="'netto'"
            />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="brutto">
        <Card>
          <CardHeader>
            <CardTitle>Kalkulator dla wpisanej kwoty brutto</CardTitle>
            <CardDescription>
              Obliczanie szacunkowej skladki rocznej ubezpieczenia OC/AC na
              podstawie wieku samochodu i wartosci auta
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-2">
            <LeasingForm
              @calculationResults="handleLeasingFormEvent"
              :type="'brutto'"
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
    <div v-else>
      <div class="w-[260px] xxs:w-[280px] xs:w-[400px] mx-auto mb-4">
        <h3 class="text-xl mx-auto font-bold text-center">Kwota składki po wprowadzeniu danych wynosi:</h3>
      <ul class="list-disc pl-8">
        <li>{{ leasingCalculated.finalLeasingFeeInNetto }} zł Netto</li>
        <li>{{ leasingCalculated.finalLeasingFeeInBrutto }} zł Brutto.</li>
      </ul>
      </div>
      <Tabs
        default-value="two-installments"
        class="w-[260px] xxs:w-[280px] xs:w-[400px] mx-auto"
      >
        <TabsList class="grid w-full grid-cols-2">
          <TabsTrigger value="two-installments"> 2 raty </TabsTrigger>
          <TabsTrigger value="four-installements"> 4 raty </TabsTrigger>
        </TabsList>
        <TabsContent value="two-installments">
          <Card>
            <CardHeader>
              <CardTitle>Przy płatności w dwóch ratach:</CardTitle>
              <CardDescription>
                <ul class="list-disc pl-8">
                  <li>
                    Łączna kwota składki NETTO wyniesie
                    {{ leasingCalculated.inTwoInstallments.nettoTotal }} zł
                  </li>
                  <li>
                    Łączna kwota składki BRUTTO wyniesie
                    {{ leasingCalculated.inTwoInstallments.bruttoTotal }} zł
                  </li>
                  <li>
                    Miesięczna rata NETTO wyniesie -
                    {{ leasingCalculated.inTwoInstallments.nettoPerMonth }} zł
                  </li>
                  <li>
                    Miesięczna rata BRUTTO wyniesie -
                    {{ leasingCalculated.inTwoInstallments.bruttoPerMonth }} zł
                  </li>
                </ul>
                <Button @click="leasingCalculated = !leasingCalculated" class="mt-4" type="submit"> Oblicz wartość składki jeszcze raz</Button>
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
        <TabsContent value="four-installements">
          <Card>
            <CardHeader>
              <CardTitle>Przy płatności w czterech ratach:</CardTitle>
              <CardDescription>
                <ul class="list-disc pl-8">
                  <li>
                    Łączna kwota składki NETTO wyniesie
                    {{ leasingCalculated.inFourInstallments.nettoTotal }} zł
                  </li>
                  <li>
                    Łączna kwota składki BRUTTO wyniesie
                    {{ leasingCalculated.inFourInstallments.bruttoTotal }} zł
                  </li>
                  <li>
                    Miesięczna rata NETTO wyniesie -
                    {{ leasingCalculated.inFourInstallments.nettoPerMonth }} zł
                  </li>
                  <li>
                    Miesięczna rata BRUTTO wyniesie -
                    {{ leasingCalculated.inFourInstallments.bruttoPerMonth }} zł
                  </li>
                </ul>
                <Button @click="leasingCalculated = !leasingCalculated" class="mt-4" type="submit"> Oblicz wartość składki jeszcze raz</Button>
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  </section>
</template>

<script setup>
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast"
const leasingCalculated = ref();
const handleLeasingFormEvent = (emittedValue) => {
  if(emittedValue.message) {
    toast({
          variant: "destructive",
          title: "Coś poszło nie tak. Spróbuj ponownie wprowadzając inne dane.",
          description: emittedValue.message,
        });
        return;
  }
  leasingCalculated.value = emittedValue;
};
</script>