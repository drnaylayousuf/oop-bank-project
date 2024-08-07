#! /usr/bin/env node


// opp bank project

import inquirer from "inquirer";

// interface for bank account

interface IBankAccount {
    accountNumber: number;
    accountBalance: number;

    debit(amount:number):void
    credit(amount:number):void
    checkBalance():void
}

// class for bank account

class BankAccount implements IBankAccount{
    accountNumber: number;
    accountBalance: number;

    constructor(accountNumber:number, accountBalance:number){
        this.accountNumber = accountNumber;
        this.accountBalance = accountBalance;
    }
     // debit method

    debit(amount: number): void {
        if(this.accountBalance >= amount){
            this.accountBalance -= amount;
            console.log(`Withdrawal of $${amount} successfully. And your remaining balance is: $${this.accountBalance}`);
            
        }
        else{
            console.log("Sorry, you have insufficient balance!");
        }
    }
    // credit method

    credit(amount: number): void {
        if(amount > 100){
            amount -= 1; // $1 fee detect if more than $100 is deposited
        }
        this.accountBalance += amount;
        console.log(`Deposit of $${amount} successfully. And your remaining balance is: $${this.accountBalance}`);
        }
        // check balance method

        checkBalance(): void {
            console.log(`Your current balance is: $${this.accountBalance}`);
            
        }
    }

    // class for customer

    class Customer{
        firstName: string;
        lastName:string;
        gender: string;
        age: number;
        mobileName: number;
        account:BankAccount;

        constructor(firstName: string, lastName: string, gender: string, age: number, mobileName:number, account: BankAccount){
            this.firstName = firstName;
            this.lastName = lastName;
            this.gender = gender;
            this.age = age;
            this.mobileName = mobileName;
            this.account = account
        }
    }
    // create bank accounts

    let accounts:BankAccount[] = [
        new BankAccount(1111, 500),
        new BankAccount(1122, 1000),
        new BankAccount(1133, 2000)
    ];

    // create customers 

    let customers: Customer[] = [
        new Customer("Shakeel", "Ahmed", "Male", 32, 3332456784, accounts[0]),
        new Customer("Nadeem", "Khan", "Male", 45, 3162456784, accounts[1]),
        new Customer("Saba", "Ali", "Female", 26, 3412456784, accounts[2])
    ];

     async function BankOop(){
        do{
            const insertAccountNumber = await inquirer.prompt([{
                name: "accountNumber",
                type: "number",
                message: "Enter Your Account Number."
            }]);

            const findCustomer = customers.find(customer => customer.account.accountNumber === insertAccountNumber.accountNumber)
            
            if(findCustomer){
                console.log(`Hello, ${findCustomer.firstName} ${findCustomer.lastName}!\n`);
                const answer = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: "Select an option.",
                    choices: ["Deposit", "Withdraw","Check Balance", "Exit"]
                }]);

                switch(answer.select){
                    case "Deposit":
                        const creditAmount = await inquirer.prompt([{
                            name: "amount",
                            type: "number",
                            message: "Enter the amount to deposit:"
                        }]);
                        findCustomer.account.credit(creditAmount.amount);
                        break;
                    case "Withdraw":
                        const debitAmount = await inquirer.prompt([{
                            name: "amount",
                            type: "number",
                            message: "Enter the amount to withdraw:"
                        }]);
                        findCustomer.account.debit(debitAmount.amount);
                        break;
                    case "Check Balance":
                        findCustomer.account.checkBalance();
                        break;
                    case "Exit":
                        console.log("Exiting...");
                        return;
                        
                }
                
            }else{
                console.log("Invalid Account Nunber, Please Enter Valid Account Number.");
                
            }
        } while(true)

     };

     BankOop();