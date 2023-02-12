import moment from "moment";

class Helpers {
    uploadImage(fileInput) {
        if (fileInput) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.readAsDataURL(fileInput)
                reader.onload = () => resolve(reader.result)
                reader.onerror = (error) => reject(error)
            })
        }
        else {
            // do nothing
        }
    }
    removeTags(str) {
        return str.replace(/(<([^>]+)>)/ig, '')
    }
    formatCurrency(val) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'KES',
        });
        return formatter.format(val)
    }
    formatDate(date) {
        return moment(date).format('MMMM Do YYYY, h:mm:ss a')
    }
    removeBlankAttributes(obj){
        return Object.fromEntries(
            Object.entries(obj).filter(([, value]) => value)
        );
    }

    /**
     * Download Excel version of the report
     */
    downloadExcelReport(name,response) {
        const fileName = `${name}.xlsx`
        const url = window.URL.createObjectURL(new Blob([response]))
        console.log(url)
        const link = document.createElement('a')
        link.href = url
        console.log(url)
        link.setAttribute('download', fileName)
        document.body.appendChild(link)
        link.click()
    }
    downloadCSVData(name,csvdata) {
        //
        try{
            const blob = new Blob([csvdata], { type: "text/csv" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = name+".csv";
            link.click();
        } catch (e) {
            console.log(e)
        }
        //
    }


}
export default new Helpers()
