import sys
print("Python executable:", sys.executable)
print("Python version:", sys.version)
print("Venv active:", hasattr(sys, 'real_prefix') or (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix))
