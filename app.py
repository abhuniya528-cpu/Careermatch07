import streamlit as st
import pandas as pd
import time

# --- Page Configuration ---
st.set_page_config(
    page_title="CareerMatch AI",
    page_icon="🎯",
    layout="wide",
    initial_sidebar_state="expanded",
)

# --- Custom Styling ---
st.markdown("""
<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

    html, body, [class*="css"] {
        font-family: 'Inter', sans-serif;
        color: #1F2937;
    }

    .main {
        background-color: #FAFAF9;
    }

    /* Hide Streamlit elements */
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    header {visibility: hidden;}

    /* Typography */
    h1 {
        font-size: 28px !important;
        font-weight: 600 !important;
        color: #1F2937 !important;
        margin-bottom: 24px !important;
        letter-spacing: -0.02em !important;
    }

    h2 {
        font-size: 18px !important;
        font-weight: 600 !important;
        color: #1F2937 !important;
        margin-top: 32px !important;
        margin-bottom: 16px !important;
    }

    p, li, span {
        font-size: 15px !important;
        line-height: 1.6 !important;
    }

    /* Sidebar */
    [data-testid="stSidebar"] {
        background-color: #FFFFFF;
        border-right: 1px solid #E5E7EB;
    }

    /* Cards */
    .stCard {
        background-color: #FFFFFF;
        border: 1px solid #E5E7EB;
        padding: 24px;
        border-radius: 8px;
        margin-bottom: 16px;
    }

    /* Score Card */
    .score-container {
        margin-bottom: 32px;
    }
    .score-value {
        font-size: 48px;
        font-weight: 700;
        font-variant-numeric: tabular-nums;
        color: #0F766E;
        line-height: 1;
        margin-bottom: 8px;
    }
    .score-label {
        font-size: 14px;
        color: #6B7280;
        margin-bottom: 12px;
    }
    .progress-bar-bg {
        width: 100%;
        height: 6px;
        background-color: #F3F4F6;
        border-radius: 3px;
        overflow: hidden;
    }
    .progress-bar-fill {
        height: 100%;
        background-color: #0F766E;
        transition: width 0.6s ease-out;
    }

    /* Skill Tags */
    .skill-tag {
        display: inline-flex;
        align-items: center;
        padding: 4px 12px;
        border-radius: 9999px;
        font-size: 13px;
        font-weight: 500;
        margin-right: 8px;
        margin-bottom: 8px;
    }
    .skill-matched {
        background-color: #0F766E;
        color: #FFFFFF;
    }
    .skill-missing {
        background-color: transparent;
        color: #6B7280;
        border: 1px solid #E5E7EB;
    }

    /* Table */
    .stTable {
        border: 1px solid #E5E7EB;
        border-radius: 8px;
        overflow: hidden;
    }
    
    /* Footer */
    .footer {
        margin-top: 64px;
        padding-top: 24px;
        border-top: 1px solid #E5E7EB;
        color: #6B7280;
        font-size: 13px;
    }

    /* Hide default borders on inputs */
    .stTextInput>div>div>input, .stTextArea>div>div>textarea {
        border-radius: 8px !important;
        border-color: #E5E7EB !important;
    }
</style>
""", unsafe_allow_html=True)

# --- Helper Functions ---

def render_score_card(score: int):
    """Renders a polished score card with a progress bar."""
    st.markdown(f"""
        <div class="score-container">
            <div class="score-label">Overall Match Score</div>
            <div class="score-value">{score}%</div>
            <div class="progress-bar-bg">
                <div class="progress-bar-fill" style="width: {score}%"></div>
            </div>
        </div>
    """, unsafe_allow_html=True)

def render_skill_tags(matched: list, missing: list):
    """Renders skill tags as filled or outlined pills."""
    tags_html = ""
    for s in matched:
        tags_html += f'<span class="skill-tag skill-matched">{s}</span>'
    for s in missing:
        tags_html += f'<span class="skill-tag skill-missing">{s}</span>'
    
    st.markdown(f'<div style="margin-bottom: 24px;">{tags_html}</div>', unsafe_allow_html=True)

def main():
    # --- Sidebar ---
    with st.sidebar:
        st.markdown("<h1 style='font-size: 20px !important;'>Configuration</h1>", unsafe_allow_html=True)
        
        mode = st.radio("User Perspective", ["Recruiter", "Candidate"], label_visibility="collapsed")
        
        st.markdown("### Upload Document")
        resume_file = st.file_uploader("Upload resume (PDF)", type=["pdf"], label_visibility="collapsed")
        
        st.markdown("### Job Description")
        job_desc = st.text_area("Paste job requirements here", height=200, placeholder="Enter the job description...")
        
        analyze_btn = st.button("Run Match Analysis", use_container_width=True, type="primary")

    # --- Main Area ---
    st.title("CareerMatch AI")

    if not resume_file or not job_desc:
        st.info("Upload a resume and enter a job description to see matches.")
        st.stop()

    if analyze_btn:
        with st.spinner("Reading resume..."):
            time.sleep(1.5)  # Simulate processing
            
            # --- Simulated ML Results (Keeping placeholders for logic) ---
            match_score = 84
            matched_skills = ["Python", "Machine Learning", "FastAPI", "React", "TypeScript"]
            missing_skills = ["Docker", "Kubernetes", "AWS"]
            
            matches_data = [
                {"Candidate": "Alex Chen", "Score": 92, "Role": "Senior Engineer", "Location": "SF / Remote"},
                {"Candidate": "Sarah Miller", "Score": 84, "Role": "ML Specialist", "Location": "New York"},
                {"Candidate": "James Wilson", "Score": 76, "Role": "Data Scientist", "Location": "London"},
            ] if mode == "Recruiter" else [
                {"Company": "Linear", "Score": 94, "Role": "Frontend Engineer", "Salary": "$160k - $200k"},
                {"Company": "Notion", "Score": 88, "Role": "Product Engineer", "Salary": "$150k - $190k"},
                {"Company": "Greenhouse", "Score": 82, "Role": "Fullstack Dev", "Salary": "$140k - $180k"},
            ]
            
            # --- Rendering Results ---
            render_score_card(match_score)
            
            st.markdown("## Skills Match")
            render_skill_tags(matched_skills, missing_skills)
            
            st.markdown("## Detailed Breakdown")
            df = pd.DataFrame(matches_data)
            st.table(df)

    # --- Footer ---
    st.markdown("""
        <div class="footer">
            CareerMatch AI · Built by Engineering Team, AI Studio University, 2026
        </div>
    """, unsafe_allow_html=True)

if __name__ == "__main__":
    main()
