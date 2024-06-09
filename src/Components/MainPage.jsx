//import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import moment from "moment";
// import "moment/dist/locale/";
// moment.locale("ar-dz");
export default function MainPage() {
  async function getTimigs() {
    const response = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?country=JOR&city=${SelectedCity.apiName}`
    );
    setTime(response.data.data.timings);
  }

  // ******************************************************
  const [nextPrayerIndex, setNextPrayerIndex] = useState(2);
  // ******************************************************
  const [today, setToday] = useState("");
  const [date, setdate] = useState("");
  // ********************************************************
  const [SelectedCity, setSelectedCity] = useState({
    displayName: "اربد",
    apiName: "Irbid",
  });
  // ***************************************************

  // **********************************************

  // **********************************************

  const [Time, setTime] = useState({
    Fajr: "05:44",
    Dhuhr: "12:50",
    Asr: "16:00",
    Maghrib: "18:27",
    Isha: "19:46",
  });
  // *****************************************************
  const [remainingTime, setRemainingTime] = useState("");
  const handleChange = (event) => {
    const cityObj = Cities.find((city) => {
      return city.apiName === event.target.value;
    });

    setSelectedCity(cityObj);
  };

  const Cities = [
    { id: 0, displayName: "اربد", apiName: "Irbid" },
    { id: 1, displayName: "عمان", apiName: "Amman" },
    { id: 2, displayName: "الزرقاء", apiName: "Zarqa" },
    { id: 3, displayName: "المفرق", apiName: "Mafraq" },
    { id: 4, displayName: "معان", apiName: "Ma'an" },
    { id: 5, displayName: "جرش", apiName: "Jarash" },
    { id: 6, displayName: "مادبا", apiName: "Madaba" },
    { id: 7, displayName: "الطفيلة", apiName: "Tafilah" },
    { id: 8, displayName: "الكرك", apiName: "Karak" },
    { id: 9, displayName: "عجلون", apiName: "Ajloun" },
    { id: 10, displayName: "العقبة", apiName: "Aqaba" },
  ];
  //====================================================

  useEffect(() => {
    let interval = setInterval(() => {
      setCountDownTimer();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [Time]);
  // /********************************************************** */
  useEffect(() => {
    getTimigs();
    const t = moment();
    setToday(t.format("hh:mm"));
    const dateTime = moment();
    setdate(dateTime.format("MM-DD-YYYY"));
  }, [SelectedCity]);
  // *************************************

  // **********************************************
  const prayerArray = [
    { key: "Fajr", displayName: "الفجر" },
    { key: "Dhuhr", displayName: "الظهر" },
    { key: "Asr", displayName: "العصر" },
    { key: "Maghrib", displayName: "المغرب" },
    { key: "Isha", displayName: "العشاء" },
  ];

  //=========================================================

  //=========================================================
  const setCountDownTimer = () => {
    const momentNow = moment();
    let PrayerIndex = 2;

    if (
      momentNow.isAfter(moment(Time["Fajr"], "hh:mm")) &&
      momentNow.isBefore(moment(Time["Dhuhr"], "hh:mm"))
    ) {
      PrayerIndex = 1;
    } else if (
      momentNow.isAfter(moment(Time["Dhuhr"], "hh:mm")) &&
      momentNow.isBefore(moment(Time["Asr"], "hh:mm"))
    ) {
      PrayerIndex = 2;
    } else if (
      momentNow.isAfter(moment(Time["Asr"], "hh:mm")) &&
      momentNow.isBefore(moment(Time["Maghrib"], "hh:mm"))
    ) {
      PrayerIndex = 3;
    } else if (
      momentNow.isAfter(moment(Time["Maghrib"], "hh:mm")) &&
      momentNow.isBefore(moment(Time["Isha"], "hh:mm"))
    ) {
      PrayerIndex = 4;
    } else {
      PrayerIndex = 0;
    }
    setNextPrayerIndex(PrayerIndex);
    //****set counter time down ****/
    const nextPrayerObject = prayerArray[PrayerIndex];
    const nextPrayerTime = Time[nextPrayerObject.key];
    const nextPrayerTimeMoment = moment(nextPrayerTime, "hh:mm");
    let remainTime = moment(nextPrayerTime, "hh:mm").diff(momentNow);
    if (PrayerIndex == 0) {
      const midNightDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow);
      const fajrToMidNightDiff = nextPrayerTimeMoment.diff(
        moment("00:00:00", "hh:mm:ss")
      );

      const totaldiff = midNightDiff + fajrToMidNightDiff;
      remainTime = totaldiff;
    }
    const durationRemainTime = moment.duration(remainTime);
    setRemainingTime(
      `${durationRemainTime.hours()}:${durationRemainTime.minutes()}:${durationRemainTime.seconds()}`
    );
  };

  // **************************//
  return (
    <div className="container">
      <div className="d-flex justify-content-center mt-5">
        <h1 className="title">مواقيت الصلاة</h1>
      </div>
      <div className="d-flex justify-content-center mt-5 mb-5">
        {/* <i className="far fa-bahai" ></i> */}
        <h1>
          إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا
        </h1>
      </div>
      {/* ******************************************************************** */}

      {/* ******************************************** */}
      <div className="container">
        <div className="T row">
          <div className="col">
            <select
              className="selCity form-select form-select-lg mb-3"
              aria-label=".form-select-lg example"
              onChange={handleChange}
            >
              {Cities.map((city) => {
                return (
                  <option key={city.id} value={city.apiName}>
                    {city.displayName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col">
            <h2>{SelectedCity.displayName}</h2>
          </div>
          <div className="col">
            <h5>{date}</h5>
          </div>
          <div className="col">
            <h3> {today}</h3>
          </div>
        </div>
      </div>
      {/* ******************************************** */}
      <div className="counter d-flex-col justify-content-center mt-5 text-center ">
        <h3>يتبقى حتى صلاة {prayerArray[nextPrayerIndex].displayName}</h3>

        <h1>{remainingTime}</h1>
      </div>
      {/* *********************************************************** */}
      <div className="container-fluid mt-5 mb-5">
        <table className="table table-hover">
          <thead>
            <tr>
              <th className="tt" scope="col">
                <h3>الصلاة</h3>
              </th>
              <th className="tt" scope="col">
                <h3>وقت الاذان</h3>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">
                <h4>الفجر</h4>
              </th>
              <td>
                <h4>{Time.Fajr}</h4>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <h4>الظهر</h4>
              </th>
              <td>
                <h4>{Time.Dhuhr}</h4>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <h4>العصر</h4>
              </th>
              <td colSpan="2">
                <h4>{Time.Asr}</h4>{" "}
              </td>
            </tr>
            <tr>
              <th scope="row">
                <h4>المغرب</h4>
              </th>
              <td colSpan="2">
                <h4>{Time.Maghrib}</h4>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <h4>العشاء</h4>
              </th>
              <td colSpan="2">
                <h4>{Time.Isha}</h4>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* ***************************************************************** */}

      {/* ***************************************************************** */}
    </div>
  );
}
