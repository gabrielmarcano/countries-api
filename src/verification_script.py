from playwright.sync_api import sync_playwright

def verify_app():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Verify Welcome Page (Landing)
        print("Navigating to home...")
        page.goto("http://localhost:5173/")
        page.wait_for_load_state("networkidle")
        page.screenshot(path="/home/jules/verification/welcome_page.png")
        print("Welcome page screenshot taken.")

        # 2. Verify Dark Mode Toggle
        print("Toggling dark mode...")
        # Find the toggle button (it has aria-label="Toggle dark mode")
        toggle_btn = page.locator("button[aria-label='Toggle dark mode']")
        toggle_btn.click()
        page.wait_for_timeout(500) # Wait for transition
        page.screenshot(path="/home/jules/verification/welcome_page_dark.png")
        print("Dark mode screenshot taken.")

        # 3. Verify Browse Mode
        print("Navigating to Browse...")
        page.get_by_role("link", name="Browse Freely").click()
        page.wait_for_url("**/browse")
        page.wait_for_load_state("networkidle")
        page.screenshot(path="/home/jules/verification/browse_page.png")
        print("Browse page screenshot taken.")

        # 4. Verify Game Mode
        print("Navigating to Game...")
        page.goto("http://localhost:5173/") # Back to welcome
        page.get_by_role("link", name="I'm Feeling Lucky").click()

        # Should redirect to /play/XYZ
        page.wait_for_url("**/play/**")
        page.wait_for_load_state("networkidle")

        # Take a screenshot of the game layout
        page.screenshot(path="/home/jules/verification/game_page.png")
        print("Game page screenshot taken.")

        browser.close()

if __name__ == "__main__":
    verify_app()
