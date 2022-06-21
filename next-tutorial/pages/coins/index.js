import React from 'react';
import axios from "axios";

const CoinList = ({coinData}) => {
    console.log(coinData)

    return (
        <div>{coinData.coins.map((coin, idx) => {
            return (
                <div key={idx}>
                    <h1>{coin.name}</h1>
                    <img src={coin.icon}/>
                    <p>{coin.price}</p>
                </div>
            )
        })}</div>
    );
};

export const getStaticProps = async ({params}) => {
    const data = await axios.get("https://api.coinstats.app/public/v1/coins?skip=0")

    return {
        props: {
            coinData: data.data
        }
    }
}

// export const getServerSideProps = async ({params}) => {
//     const data = await axios.get("https://api.coinstats.app/public/v1/coins?skip=0")
//
//     return {
//         props: {
//             coinData: data.data
//         }
//     }
// }

export default CoinList;