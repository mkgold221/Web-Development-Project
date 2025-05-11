
import streamlit as st
import pandas as pd
import plotly.express as px
import numpy as np

# Sample dataset (replace with real data)
np.random.seed(0)
brands = ['Rolex', 'Omega', 'Seiko', 'Casio', 'Apple', 'Samsung']
categories = ['Luxury', 'Luxury', 'Sport', 'Casual', 'Smart', 'Smart']

df = pd.DataFrame({
    'Brand': np.random.choice(brands, 200),
    'Model': [f'Model {i}' for i in range(200)],
    'Price': np.random.randint(100, 10000, 200),
    'Sales': np.random.randint(50, 500, 200),
    'Year': np.random.choice([2020, 2021, 2022, 2023], 200),
})
df['Category'] = df['Brand'].map(dict(zip(brands, categories)))

# Streamlit App Layout
st.title("⌚ Watch Sales Dashboard")

# Brand Selection Dropdown
selected_brands = st.multiselect(
    "Select Watch Brand(s)",
    options=df['Brand'].unique(),
    default=df['Brand'].unique().tolist()
)

# Filter data based on selected brands
filtered_df = df[df['Brand'].isin(selected_brands)]

# KPI Cards
avg_price = filtered_df['Price'].mean()
total_sales = filtered_df['Sales'].sum()
total_models = filtered_df['Model'].nunique()

col1, col2, col3 = st.columns(3)

with col1:
    st.metric(label="Average Price", value=f"${avg_price:,.2f}")
with col2:
    st.metric(label="Total Sales", value=f"{total_sales:,} units")
with col3:
    st.metric(label="Total Models", value=f"{total_models}")

# Charts

# Bar Chart (Sales by Brand)
bar_fig = px.bar(
    filtered_df.groupby('Brand', as_index=False)['Sales'].sum(),
    x='Brand', y='Sales', title="Sales by Brand", color='Brand'
)
st.plotly_chart(bar_fig)

# Pie Chart (Sales by Category)
pie_fig = px.pie(filtered_df, names='Category', values='Sales', title="Category Share")
st.plotly_chart(pie_fig)

# Line Chart (Average Price by Brand)
line_fig = px.line(
    filtered_df.groupby('Brand')['Price'].mean().reset_index(),
    x='Brand', y='Price', title="Average Price by Brand"
)
st.plotly_chart(line_fig)

# Histogram (Price Distribution)
hist_fig = px.histogram(filtered_df, x='Price', nbins=30, title="Price Distribution")
st.plotly_chart(hist_fig)

# Box Plot (Price Distribution by Category)
box_fig = px.box(filtered_df, x='Category', y='Price', color='Category', title="Price by Category")
st.plotly_chart(box_fig)

# Scatter Plot (Price vs Sales)
scatter_fig = px.scatter(
    filtered_df, x='Price', y='Sales', color='Brand',
    size='Sales', hover_data=['Model'], title="Price vs Sales"
)
st.plotly_chart(scatter_fig)

# Treemap (Brand and Category Share)
treemap_fig = px.treemap(
    filtered_df, path=['Category', 'Brand'], values='Sales', title="Treemap of Sales"
)
st.plotly_chart(treemap_fig)

# Sunburst Chart (Category -> Brand -> Model)
sunburst_fig = px.sunburst(
    filtered_df, path=['Category', 'Brand', 'Model'], values='Sales', title="Sunburst Breakdown"
)
st.plotly_chart(sunburst_fig)

# Area Chart (Cumulative Sales Over Time)
area_df = filtered_df.groupby(['Year', 'Brand'], as_index=False)['Sales'].sum()
area_fig = px.area(area_df, x='Year', y='Sales', color='Brand', title="Cumulative Sales Over Time")
st.plotly_chart(area_fig)
