const LEGS = require('../../../data/legs.json');
const CARDIO = require('../../../data/cardio.json');
const BACK = require('../../../data/back.json');
const CHEST = require('../../../data/chest.json');
const ARMS = require('../../../data/arms.json');
const SHOULDERS = require('../../../data/shoulders.json');
const ABS = require('../../../data/abs.json');
const WORKOUTS_JSON = require('../../../data/workout.json'); 

// muslces
const MUSCLES_ARMS = require('../../../data/muscles-arms.json'); 


let temp = []
WORKOUTS_JSON.map((workout, i) => {
  let newExerciseObject = {
    name: Object.keys(workout)[0],
    ...workout[Object.keys(workout)[0]],
    id: i+1
  };

  temp.push(newExerciseObject);
})

const WORKOUTS_DATA = temp;

export default function(req,res) {
	let workoutsToReturn = WORKOUTS_DATA;
  
  // if(Object.keys(req.query).length > 0){
  //   Object.keys(req.query).map(key => {
  //     workoutsToReturn = workoutsToReturn.map(workout => {
  //       // each property
  //       if(workout){
  //         for (var i = 0; i < Object.keys(workout).length; i++) {
  //           const prop = Object.keys(workout)[i];
  //           if(prop.toLowerCase().indexOf(key) > -1){
  //             if(workout[prop].toLowerCase().indexOf(req.query[key].toLowerCase()) > -1){
  //               console.log(workout);
  //               return workout
  //             }
  //           }
  //         };
  //       }
  //     });
  //   });

  // }

  // res.json({
  //   // workouts : workoutsToReturn.filter(n => {
  //   //   return n != undefined;
  //   // })
  // });
  res.json({
    featured: LEGS.concat(
      CARDIO,
      BACK,
      CHEST,
      ARMS,
      SHOULDERS,
      ABS
    ),
    all : workoutsToReturn.filter(n => {
      return n != undefined;
    }),
    muscles: {
      arms: MUSCLES_ARMS
    }
  });

}