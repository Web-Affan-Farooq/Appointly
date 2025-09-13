export * from "./relations/index"
export * from "./tables/index";

/* application has these core entities :
- starting from user ... (Created automatically from better auth)
- service has following fields :
        - name
        - user_id (from which service belongs to)
        - it's price per appointment
        - it's currency ,
        -  a description ,
        - activation status for eheather it's activated or not 
        -  days of availability 
        -  timings in universal format 
        -  duration of each appointment in minutes
        -  ratings (array of numbers), 
        - maximum appointments each day
- appointment table has the following field :
    - user name,
    - user email
    - status (PENDING ,CONFIRMED ,COMPLETED ,CANCELLED)
    starting time (when was appointment started)
    ending time (when was appointment ended)
    - service_id (from which appointment belongs to)
*/