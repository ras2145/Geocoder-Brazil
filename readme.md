# Generic Geocoder Tool

This tool geocodes csv files with geocode info and calculate distance between points

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

nodejs version 8.9.1 installed


### Installing

clone the repo and yarn or npm install

## Running the app

node index 

node index geocode and follow the instructions

edit the .Env file for API and Encoding configuration

### Encoding


The input is read in 'binary' 
The output is written in 'binary'

In the ENV file you can choose internal transformation write IGNORE to ignore it
Coding will follow iconv package

### The result

you will get the same input file plus 6 more fields

Latitude - address 1 (teacher)
Longitude - addess 1 (teacher)

Latitude - address 2 (school)
Longitude - address 2 (school)

Geographical Distance in Km Nan for non calculated distance

Precision - address 1
Precision - address 2

For precision read this legend
L1 for exact matching, 
L2 for neighborhood and city matching

null values mean weren't available during the processing time

Any API error will be logged in the result file

## License

This project is licensed under the MIT License 

