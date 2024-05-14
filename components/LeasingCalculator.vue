<template>
  <Tabs default-value="netto" class="w-[260px] xxs:w-[280px] xs:w-[400px] mx-auto">
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
            <LeasingForm :type="'netto'"/>
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
            <LeasingForm :type="'brutto'"/> 
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
</template>