const setRequiredField = (field) => {
    field.required = true
}

const formTambahObat = document.querySelector('#form-tambah-obat')
if (formTambahObat) {
    formTambahObat.querySelectorAll('input, select, textarea').forEach(field => {
        setRequiredField(field)
    })
}