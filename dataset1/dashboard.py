
import streamlit as st
import plotly.express as px
import pandas as pd
import numpy as np

# Set page config
st.set_page_config(
    page_title="Global Development Dashboard",
    page_icon="🌍",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Load data
@st.cache_data
def load_data():
    return px.data.gapminder()

df = load_data()

# Custom theme colors
primary_color = "#1f77b4"
secondary_color = "#ff7f0e"
background_color = "#f0f2f6"
plot_bgcolor = "#ffffff"

# Sidebar filters
st.sidebar.title("🌍 Filter Options")
st.sidebar.markdown("Customize the dashboard by selecting filters below:")

# Year selector
years = sorted(df['year'].unique())
selected_years = st.sidebar.slider(
    "Select Year Range",
    min_value=min(years),
    max_value=max(years),
    value=(min(years), max(years))
)

# Continent selector
all_continents = df['continent'].unique()
selected_continents = st.sidebar.multiselect(
    "Select Continents",
    options=all_continents,
    default=all_continents
)

# Population filter
min_pop, max_pop = int(df['pop'].min()), int(df['pop'].max())
population_range = st.sidebar.slider(
    "Population Range (millions)",
    min_value=min_pop // 1000000,
    max_value=max_pop // 1000000,
    value=(min_pop // 1000000, max_pop // 1000000)
)

# GDP per capita filter
min_gdp, max_gdp = int(df['gdpPercap'].min()), int(df['gdpPercap'].max())
gdp_range = st.sidebar.slider(
    "GDP per Capita Range",
    min_value=min_gdp,
    max_value=max_gdp,
    value=(min_gdp, max_gdp)
)

# Apply filters
filtered_df = df[
    (df['year'] >= selected_years[0]) & 
    (df['year'] <= selected_years[1]) &
    (df['continent'].isin(selected_continents)) &
    (df['pop'] >= population_range[0] * 1000000) &
    (df['pop'] <= population_range[1] * 1000000) &
    (df['gdpPercap'] >= gdp_range[0]) &
    (df['gdpPercap'] <= gdp_range[1])
]

# Main page layout
st.title("🌍 Global Development Dashboard")
st.markdown("Explore global development indicators across countries and time.")

# Summary statistics
with st.expander("📊 Summary Statistics", expanded=True):
    col1, col2, col3, col4 = st.columns(4)
    with col1:
        st.metric("Countries", filtered_df['country'].nunique())
    with col2:
        st.metric("Years", f"{selected_years[0]} - {selected_years[1]}")
    with col3:
        st.metric("Avg Life Expectancy", f"{filtered_df['lifeExp'].mean():.1f} years")
    with col4:
        st.metric("Avg GDP per Capita", f"${filtered_df['gdpPercap'].mean():,.0f}")

# Visualizations
st.header("📈 Data Visualizations")

# First row of charts
col1, col2 = st.columns(2, gap="large")

with col1:
    st.subheader("Life Expectancy Over Time")
    fig = px.line(
        filtered_df,
        x="year",
        y="lifeExp",
        color="continent",
        line_group="country",
        hover_name="country",
        labels={"lifeExp": "Life Expectancy (years)", "year": "Year"},
        template="plotly_white",
        color_discrete_sequence=px.colors.qualitative.Plotly
    )
    fig.update_layout(
        plot_bgcolor=plot_bgcolor,
        paper_bgcolor=background_color
    )
    st.plotly_chart(fig, use_container_width=True)

with col2:
    st.subheader("GDP vs Life Expectancy")
    fig = px.scatter(
        filtered_df,
        x="gdpPercap",
        y="lifeExp",
        size="pop",
        color="continent",
        hover_name="country",
        animation_frame="year",
        log_x=True,
        size_max=60,
        labels={
            "gdpPercap": "GDP per Capita (log scale)",
            "lifeExp": "Life Expectancy",
            "pop": "Population"
        },
        template="plotly_white",
        color_discrete_sequence=px.colors.qualitative.Plotly
    )
    fig.update_layout(
        plot_bgcolor=plot_bgcolor,
        paper_bgcolor=background_color
    )
    st.plotly_chart(fig, use_container_width=True)

# Second row of charts
col1, col2 = st.columns(2, gap="large")

with col1:
    st.subheader("Population Distribution by Continent")
    continent_pop = filtered_df.groupby('continent')['pop'].sum().reset_index()
    fig = px.pie(
        continent_pop,
        values="pop",
        names="continent",
        hole=0.4,
        labels={"pop": "Population", "continent": "Continent"},
        template="plotly_white",
        color_discrete_sequence=px.colors.qualitative.Plotly
    )
    fig.update_layout(
        plot_bgcolor=plot_bgcolor,
        paper_bgcolor=background_color,
        showlegend=True
    )
    st.plotly_chart(fig, use_container_width=True)

with col2:
    st.subheader("Life Expectancy Distribution")
    fig = px.box(
        filtered_df,
        x="continent",
        y="lifeExp",
        color="continent",
        points="all",
        hover_name="country",
        labels={"lifeExp": "Life Expectancy", "continent": "Continent"},
        template="plotly_white",
        color_discrete_sequence=px.colors.qualitative.Plotly
    )
    fig.update_layout(
        plot_bgcolor=plot_bgcolor,
        paper_bgcolor=background_color,
        xaxis_title="",
        showlegend=False
    )
    st.plotly_chart(fig, use_container_width=True)

# Third row - single chart
st.subheader("GDP per Capita by Country")
fig = px.bar(
    filtered_df[filtered_df['year'] == selected_years[1]].sort_values('gdpPercap', ascending=False).head(20),
    x="country",
    y="gdpPercap",
    color="continent",
    labels={"gdpPercap": "GDP per Capita", "country": "Country"},
    template="plotly_white",
    color_discrete_sequence=px.colors.qualitative.Plotly
)
fig.update_layout(
    plot_bgcolor=plot_bgcolor,
    paper_bgcolor=background_color,
    xaxis_title="",
    yaxis_title="GDP per Capita (USD)"
)
st.plotly_chart(fig, use_container_width=True)

# Data preview
with st.expander("🔍 View Raw Data", expanded=False):
    st.dataframe(filtered_df.sort_values(['year', 'country']), use_container_width=True)
    csv = filtered_df.to_csv(index=False).encode('utf-8')
    st.download_button(
        label="Download Filtered Data as CSV",
        data=csv,
        file_name="gapminder_filtered.csv",
        mime="text/csv"
    )

# Footer
st.markdown("---")
st.markdown("""
    *Dashboard created with Streamlit and Plotly*  
    *Data source: Gapminder dataset*  
    *💡 Tip: Use the filters in the sidebar to customize the views*
""")