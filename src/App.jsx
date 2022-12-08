import React, { useState } from "react"
import './App.css'
import { industries } from "./data/industries"


function App() {

  const [industry, setIndustry] = useState(industries[0].value);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumSignificantDigits: 3
  })

  const formatter2 = new Intl.NumberFormat('en-US');

  const onChangeRange = (e) => {
    let target = e.target
    const min = target.min
    const max = target.max
    const val = target.value
    
    target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
  }

  const onChangeIndustry = (e) => {
    setIndustry(e.target.value)
  }

  const [dealSize,setDealSize] = useState(1000)

  const onChangeDeal = (e) => {
    setDealSize(e.target.value)
    onChangeRange(e)
  }

  const [prospects,setProspects] = useState(850)

  const onChangeProspects = (e) => {
    setProspects(e.target.value)
    onChangeRange(e)
  }

  const [ratio, setRatio] = useState(10)

  const onChangeRatio = (e) => {
    setRatio(e.target.value)
    onChangeRange(e)
  }
  
  const approximate = Math.round(prospects*(industry/1000))

  const price = Math.round(approximate * (ratio/100) * dealSize * 12 )

  const spents = prospects*3*12

  const roiValue = Math.round( ((price - spents) / spents*100) )


  return (
    <section>
      <div className="calculator__container">
        <div className="roi-calculator__header">
          <p>To get a better understanding of what your cost and return on investment (ROI) would be depending on your industry, successful conversions, and budget, check out the calculator below.</p>
        </div>

        <iframe src="" frameborder="0"></iframe>

        <div className="calculator-form__container">
          <div className="col">
            <fieldset>
              <h4>Your industry</h4>
              <span>Choose your industry, or pick Average if you can't find it.</span>
              <select name="" id="" onChange={onChangeIndustry}>
                {
                  industries.map(({name,value,slug})=>{
                    return(
                      <option key={slug} value={value}>{name}</option>
                    )
                  })
                }
              </select>
            </fieldset>
            <fieldset>
              <h4>Average Deal Size, $</h4>
              <span>Choose the average size of your deals.</span>
              <label>{ formatter.format(dealSize) }</label>
              <input type="range" name="" id="" min={1000} max={100000} step={1000} onChange={onChangeDeal} />
            </fieldset>
            <fieldset>
              <h4>Number of B2B/B2C prospects</h4>
              <span>Choose the number of prospects you want to engage each month.</span>
              <label>{ formatter2.format(prospects) }</label>
              <input type="range" min={850} max={4500} step={50} onChange={onChangeProspects} />
            </fieldset>
            <fieldset>
              <h4>Close Ratio (after appointment) %</h4>
              <span>To calculate this number, divide the number of sales you made by the number of quotes you sent out.</span>
              <label>{ratio}%</label>
              <input type="range" name="" id="" min={10} max={100} step={10} onChange={onChangeRatio} />
            </fieldset>
          </div>


          <div className="col">

            <h4>B2B/B2C lead generation that sees your business through </h4>
            

            <div className="result-box">
              <span className="result">{ formatter.format(price) }/year</span>
            </div>

            <div className="result-row">
              <div className="result-box">
                <span className="result">{approximate}</span>
                <span>Approx. number of appointment booked / monthly</span>
              </div>
              <div className="result-box">
                <span className="result">{roiValue}%</span>
                <span>Return on marketing investment</span>
              </div>
            </div>

            <span>Each model offers flexible pricing to fit your lead generation needs and stay within the limits of your budget.</span>

          </div>
        </div>
      </div>
    </section>
  )
}

export default App
