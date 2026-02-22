.PHONY: help start stop restart build serve clean

# Default port for Docusaurus
PORT = 3000
PID_FILE = .server.pid

# Colors for output
GREEN = \033[0;32m
YELLOW = \033[1;33m
RED = \033[0;31m
NC = \033[0m # No Color

help: ## Show this help message
	@echo "$(GREEN)Available commands:$(NC)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(YELLOW)%-15s$(NC) %s\n", $$1, $$2}'
	@echo ""

start: ## Start the development server
	@echo "$(GREEN)Starting Docusaurus development server...$(NC)"
	@if [ -f $(PID_FILE) ]; then \
		if ps -p $$(cat $(PID_FILE)) > /dev/null 2>&1; then \
			echo "$(YELLOW)Server is already running (PID: $$(cat $(PID_FILE)))$(NC)"; \
			exit 1; \
		else \
			rm $(PID_FILE); \
		fi \
	fi
	@npm start & echo $$! > $(PID_FILE)
	@echo "$(GREEN)Server started successfully (PID: $$(cat $(PID_FILE)))$(NC)"
	@echo "$(GREEN)Open http://localhost:$(PORT) in your browser$(NC)"

stop: ## Stop the development server
	@if [ -f $(PID_FILE) ]; then \
		PID=$$(cat $(PID_FILE)); \
		if ps -p $$PID > /dev/null 2>&1; then \
			echo "$(YELLOW)Stopping server (PID: $$PID)...$(NC)"; \
			kill $$PID 2>/dev/null || true; \
			sleep 2; \
			if ps -p $$PID > /dev/null 2>&1; then \
				echo "$(RED)Forcing server shutdown...$(NC)"; \
				kill -9 $$PID 2>/dev/null || true; \
			fi; \
			rm $(PID_FILE); \
			echo "$(GREEN)Server stopped successfully$(NC)"; \
		else \
			echo "$(YELLOW)Server is not running (stale PID file)$(NC)"; \
			rm $(PID_FILE); \
		fi \
	else \
		echo "$(YELLOW)No PID file found. Attempting to stop any running server on port $(PORT)...$(NC)"; \
		lsof -ti:$(PORT) | xargs kill -9 2>/dev/null || echo "$(YELLOW)No server found running on port $(PORT)$(NC)"; \
	fi

restart: ## Restart the development server
	@echo "$(GREEN)Restarting server...$(NC)"
	@$(MAKE) stop
	@sleep 1
	@$(MAKE) start

build: ## Build the production site
	@echo "$(GREEN)Building production site...$(NC)"
	@npm run build
	@echo "$(GREEN)Build completed successfully$(NC)"

serve: ## Serve the production build locally
	@echo "$(GREEN)Serving production build...$(NC)"
	@npm run serve

clean: ## Clean build artifacts and cache
	@echo "$(YELLOW)Cleaning build artifacts...$(NC)"
	@npm run clear
	@rm -rf build .docusaurus
	@echo "$(GREEN)Clean completed$(NC)"

status: ## Check server status
	@if [ -f $(PID_FILE) ]; then \
		PID=$$(cat $(PID_FILE)); \
		if ps -p $$PID > /dev/null 2>&1; then \
			echo "$(GREEN)Server is running (PID: $$PID)$(NC)"; \
		else \
			echo "$(RED)Server is not running (stale PID file)$(NC)"; \
		fi \
	else \
		echo "$(RED)Server is not running$(NC)"; \
	fi

