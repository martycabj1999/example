export let emailCheck = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/g;
export let nameCheck = /^[a-zA-ZáâäãéêëíîïóôöõúûüūñçčšžÁÂÄÃĆÉÊËÍÎÏÓÔÖÕÚÛÜŪÑßÇ ,.-]+$/g;
export let userNameCheck = /^[^\s]+$/;
export let shortError = /^([a-zA-Z0-9]){1,3}$/g;
export let shortPasswordError = /^([a-zA-Z0-9]{3,5})$/g;
export let whiteSpaceError = /\s/g;
export let shortPhoneError = /^([0-9]){1,3}$/g;
export let invalidCharactersPhone = /^([a-zA-Z$%&|<>#@()/]{6,})$/g;
export let savePassword = /^([a-zA-Z0-9$!?+-_%&|<>#@()/\s]{6,})$/g;
export let lowerCase = /^(?=.*[a-z])$/g;
export let upperCase = /^(?=.*[A-Z])$/g;
export let onlyNumber = /^(?=.*[0-9])$/g;
export let shortLength = /^(?=.{1,5}$)/g;
export let longLength = /^(?=.{,255})/g;


