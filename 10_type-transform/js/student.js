export default class Student {
    constructor(name, surname, lastname, studyStart, birthDate, fac) {
        this.name = name,
        this.surname = surname,
        this.lastname = lastname,
        this.studyStart = studyStart,
        this.birthDate = birthDate,
        this.fac = fac;
    }


    get fio() {
        return this.surname + ' ' + this.name + ' ' + this.lastname
    }

    getStudyPeriod() {
        const currentTime = new Date();
        return currentTime.getFullYear() - this.studyStart;
    }

    getBirthDateString() {
        const yyyy = this.birthDate.getFullYear();
        let mm = this.birthDate.getMonth() + 1;
        let dd = this.birthDate.getDate();
    
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        return dd + '.' + mm + '.' + yyyy;
    }

    getAge() {
        const today = new Date();
        let age = today.getFullYear() - this.birthDate.getFullYear();
        let m = today.getMonth() - this.birthDate.getMonth();
    
        if (m < 0 || (m === 0 && today.getDate() < this.birthDate.getDate())) {
            age--;
        }
    
        return age;
    }
    
    getFac() {
        return this.fac;
        
    }
}
