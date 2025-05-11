
import streamlit as st
import pandas as pd
import plotly.express as px

# Load dataset
df = px.data.gapminder()

# Sidebar Filters
st.set_page_config(page_title="Gapminder Dashboard", layout="wide")
st.sidebar.header("Filter Options")
selected_year = st.sidebar.slider("Select Year", int(df.year.min()), int(df.year.max()), step=5)
selected_continents = st.sidebar.multiselect("Select Continents", df.continent.unique(), default=list(df.continent.unique()))

# Filtered Data
filtered_df = df[(df.year == selected_year) & (df.continent.isin(selected_continents))]

# Title
st.title("🌍 Gapminder Interactive Dashboard")
st.markdown(f"Analyzing world development indicators for the year **{selected_year}**.")

# Summary Statistics
with st.expander("📊 Summary Statistics", expanded=True):
    st.write(filtered_df.describe())

# Layout with columns
col1, col2 = st.columns(2)

with col1:
    st.subheader("💡 Life Expectancy by Country")
    fig_bar = px.bar(filtered_df, x='country', y='lifeExp', color='continent',
                     title='Life Expectancy by Country', height=400)
    st.plotly_chart(fig_bar, use_container_width=True)

with col2:
    st.subheader("📈 GDP vs Life Expectancy")
    fig_scatter = px.scatter(filtered_df, x='gdpPercap', y='lifeExp',
                             size='pop', color='continent', hover_name='country',
                             log_x=True, size_max=60, title='GDP vs Life Expectancy')
    st.plotly_chart(fig_scatter, use_container_width=True)

# Additional Charts in Expanders
with st.expander("📉 Line Chart of Life Expectancy Over Time"):
    line_df = df[df.continent.isin(selected_continents)]
    fig_line = px.line(line_df, x='year', y='lifeExp', color='continent', line_group='country',
                       title='Life Expectancy Over Time')
    st.plotly_chart(fig_line, use_container_width=True)

with st.expander("🧩 Pie Chart of Population by Continent"):
    pop_df = filtered_df.groupby("continent")["pop"].sum().reset_index()
    fig_pie = px.pie(pop_df, values="pop", names="continent", title="Population Distribution")
    st.plotly_chart(fig_pie, use_container_width=True)

with st.expander("📦 Box Plot of GDP per Capita"):
    fig_box = px.box(filtered_df, x="continent", y="gdpPercap", color="continent",
                     title="GDP per Capita by Continent")
    st.plotly_chart(fig_box, use_container_width=True)

# Data Preview
with st.expander("🔍 Preview Data Table"):
    st.dataframe(filtered_df, use_container_width=True)

# Footer
st.markdown("---")
st.markdown("Created with ❤️ using Streamlit and Plotly Express")
