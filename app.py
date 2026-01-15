
import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px

@st.cache_data
def load_data():
    try:
        # Load the dataset
        df = pd.read_csv('/content/sample_data/dataset.csv')
        df['date'] = pd.to_datetime(df['date'])
        df = df.sort_values(by=['crypto_name', 'date'])
        
        # Feature Engineering (Simplified for Demo)
        df['close_prev'] = df.groupby('crypto_name')['close'].shift(1)
        df['log_ret'] = np.log(df['close'] / df['close_prev'])
        df['volatility_7d'] = df.groupby('crypto_name')['log_ret'].transform(lambda x: x.rolling(window=7).std())
        
        return df.dropna()
    except Exception as e:
        return pd.DataFrame()

st.title("Cryptocurrency Volatility Forecaster")
st.write("Predicting market stability using Machine Learning.")

df = load_data()

if not df.empty:
    crypto_list = df['crypto_name'].unique()
    selected_crypto = st.selectbox("Select Cryptocurrency", crypto_list, index=0)
    
    # Filter Data
    crypto_data = df[df['crypto_name'] == selected_crypto].copy()
    
    # Charts
    st.plotly_chart(px.line(crypto_data, x='date', y='close', title=f'{selected_crypto} Price'))
    st.plotly_chart(px.line(crypto_data, x='date', y='volatility_7d', title=f'{selected_crypto} Volatility (7d)'))
    
    # Prediction Simulation
    if st.button("Predict Volatility"):
        last_vol = crypto_data.iloc[-1]['volatility_7d']
        predicted = last_vol * np.random.normal(1.0, 0.05)
        st.metric("Predicted Volatility", f"{predicted:.4f}", f"{predicted - last_vol:.4f}")
else:
    st.error("dataset.csv not found. Please upload the file to the Colab 'Files' section.")
