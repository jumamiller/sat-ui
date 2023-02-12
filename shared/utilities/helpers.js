import moment from "moment";
const AlgorithmKey="SolutechLimited"

class Helpers {
    encrypt(value) {
        return btoa(AlgorithmKey + value)
    }
    decrypt(value) {
        let str=atob(value)
        return str.replace(AlgorithmKey,'');
    }
    async uploadImage(fileInput) {
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


}
export default new Helpers()
