<template>
  <div class="p-6">
    <Card class="max-w-6xl mx-auto">
      <template #title>
        📊 Excel Reader
      </template>

      <template #content>
        <div class="grid gap-4">

          <!-- File Upload -->
          <FileUpload
            mode="basic"
            accept=".xlsx,.xls"
            chooseLabel="Upload Excel"
            customUpload
            @select="handleFileUpload"
          />

          <!-- Preview Button -->
          <Button
            label="Preview Excel"
            icon="pi pi-eye"
            class="w-fit"
            :disabled="!excelFile"
            @click="previewExcel"
          />

          <!-- Excel Preview Table -->
          <DataTable
            v-if="tableData.length"
            :value="tableData"
            scrollable
            scrollHeight="400px"
            showGridlines
            stripedRows
            class="mt-4"
          >
            <Column
              v-for="col in columns"
              :key="col"
              :field="col"
              :header="col"
            />
          </DataTable>

        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { ref } from "vue"
import * as XLSX from "xlsx"

import Card from "primevue/card"
import Button from "primevue/button"
import FileUpload from "primevue/fileupload"
import DataTable from "primevue/datatable"
import Column from "primevue/column"

const excelFile = ref(null)
const tableData = ref([])
const columns = ref([])

const handleFileUpload = (event) => {
   console.log("Event:" , event.files[0]);  
  excelFile.value = event.files[0]
}

const previewExcel = () => {
  if (!excelFile.value) return

  const reader = new FileReader()

  console.log('reader file is :' , reader);

  reader.onload = (e) => {
    console.log('🟢🟢'  , e);
    const data = new Uint8Array(e.target.result)
    console.log('🔴🔴'  , data);
    const workbook = XLSX.read(data, { type: "array" });
    console.log('⚫⚫'  , workbook);
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]

    const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

    console.log("🟣🟣" ,  rawData)
    // Headers
    columns.value = rawData[0]

    // Rows
    tableData.value = rawData.slice(1).map(row => {
      const obj = {}
      columns.value.forEach((col, index) => {
        obj[col] = row[index] ?? ""
      })
      console.log("🟢🔴⚫" , obj);
      return obj
    })
  }

  reader.readAsArrayBuffer(excelFile.value);
}
</script>
